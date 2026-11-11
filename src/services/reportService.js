import initialReports from '../data/initialData';
import { STORAGE_KEY } from '../utils/constants';
import { getTodayISO, resolveReportImage } from '../utils/formatters';

const API_BASE_URL = import.meta.env?.VITE_API_URL || '/api';

function readLocalFallback() {
  if (typeof window === 'undefined') return [...initialReports];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReports));
      return [...initialReports];
    }
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(initialReports));
      return [...initialReports];
    }
    return parsed;
  } catch {
    return [...initialReports];
  }
}

function writeLocalFallback(reports) {
  if (typeof window !== 'undefined') {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(reports));
    } catch {
      // ignore
    }
  }
  return reports;
}

export async function getReports(params = {}) {
  try {
    const query = new URLSearchParams(params).toString();
    const url = query
      ? `${API_BASE_URL}/reports?${query}`
      : `${API_BASE_URL}/reports`;

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    const list = Array.isArray(payload) ? payload : payload.data || [];
    writeLocalFallback(list);
    return list;
  } catch {
    return readLocalFallback();
  }
}

export async function createReport(reportPayload) {
  const description = String(reportPayload?.description || '').trim();
  const location = String(reportPayload?.location || '').trim();

  if (!description || !location) {
    throw new Error(
      'Validación fallida: La descripción y la ubicación son obligatorias.'
    );
  }

  try {
    const response = await fetch(`${API_BASE_URL}/reports`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportPayload),
    });

    if (!response.ok) {
      const errBody = await response.json().catch(() => ({}));
      throw new Error(errBody.error || `HTTP ${response.status}`);
    }

    const created = await response.json();
    const current = readLocalFallback();
    writeLocalFallback([created, ...current.filter((r) => r.id !== created.id)]);
    return created;
  } catch {
    const nameClean =
      String(reportPayload?.contactName || '').trim() || 'Estudiante Campus';
    const phoneClean =
      String(reportPayload?.contactPhone || '').trim() || 'Recepción Central';
    const status = reportPayload?.status === 'devuelto' ? 'devuelto' : 'activo';

    const fallbackReport = {
      id: reportPayload?.id || `cr-${Date.now()}`,
      type: reportPayload?.type === 'encontrado' ? 'encontrado' : 'perdido',
      title: String(reportPayload?.title || 'Objeto sin título').trim(),
      category: reportPayload?.category || 'Otros',
      description,
      location,
      date: reportPayload?.date || getTodayISO(),
      contactName: nameClean,
      contactPhone: phoneClean,
      contactAlias:
        reportPayload?.contactAlias?.trim() || `${nameClean} · ${phoneClean}`,
      status,
      claimedDate:
        status === 'devuelto'
          ? reportPayload?.claimedDate || getTodayISO()
          : null,
      imageUrl: resolveReportImage(
        reportPayload?.imageUrl,
        reportPayload?.category || 'Otros'
      ),
    };

    const current = readLocalFallback();
    writeLocalFallback([fallbackReport, ...current]);
    return fallbackReport;
  }
}

export async function updateReportStatus(reportId, newStatus = 'devuelto') {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}/status`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const updated = await response.json();
    const current = readLocalFallback();
    writeLocalFallback(
      current.map((item) => (String(item.id) === String(reportId) ? updated : item))
    );
    return updated;
  } catch {
    const claimedDate = newStatus === 'devuelto' ? getTodayISO() : null;
    const current = readLocalFallback();
    let updatedItem = null;
    const updatedList = current.map((item) => {
      if (String(item.id) === String(reportId)) {
        updatedItem = { ...item, status: newStatus, claimedDate };
        return updatedItem;
      }
      return item;
    });
    writeLocalFallback(updatedList);
    return updatedItem;
  }
}

export async function updateReportImage(reportId, imageUrl) {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/${reportId}/image`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ imageUrl }),
    });

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const updated = await response.json();
    const current = readLocalFallback();
    writeLocalFallback(
      current.map((item) => (String(item.id) === String(reportId) ? updated : item))
    );
    return updated;
  } catch {
    const current = readLocalFallback();
    let updatedItem = null;
    const updatedList = current.map((item) => {
      if (String(item.id) === String(reportId)) {
        updatedItem = { ...item, imageUrl };
        return updatedItem;
      }
      return item;
    });
    writeLocalFallback(updatedList);
    return updatedItem;
  }
}

export async function resetDemoReports() {
  try {
    const response = await fetch(`${API_BASE_URL}/reports/reset`, {
      method: 'POST',
    });
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }
    const payload = await response.json();
    const list = Array.isArray(payload) ? payload : payload.data || initialReports;
    writeLocalFallback(list);
    return list;
  } catch {
    writeLocalFallback(initialReports);
    return [...initialReports];
  }
}

export default {
  getReports,
  createReport,
  updateReportStatus,
  updateReportImage,
  resetDemoReports,
};
