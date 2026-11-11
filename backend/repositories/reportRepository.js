import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import initialReports from '../../src/data/initialData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const DB_FILE_PATH = path.resolve(__dirname, '../data/reports.json');

export class ReportRepository {
  async ensureDatabaseFile() {
    try {
      await fs.access(DB_FILE_PATH);
    } catch {
      await fs.mkdir(path.dirname(DB_FILE_PATH), { recursive: true });
      await fs.writeFile(
        DB_FILE_PATH,
        JSON.stringify(initialReports, null, 2),
        'utf-8'
      );
    }
  }

  async findAll() {
    await this.ensureDatabaseFile();
    const raw = await fs.readFile(DB_FILE_PATH, 'utf-8');
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed) || parsed.length === 0) {
      await this.saveAll(initialReports);
      return [...initialReports];
    }
    return parsed;
  }

  async saveAll(reports) {
    await fs.mkdir(path.dirname(DB_FILE_PATH), { recursive: true });
    await fs.writeFile(DB_FILE_PATH, JSON.stringify(reports, null, 2), 'utf-8');
    return reports;
  }

  async create(newReport) {
    const reports = await this.findAll();
    const updated = [newReport, ...reports];
    await this.saveAll(updated);
    return newReport;
  }

  async updateStatus(id, status, claimedDate) {
    const reports = await this.findAll();
    let updatedItem = null;

    const updated = reports.map((item) => {
      if (String(item.id) === String(id)) {
        updatedItem = {
          ...item,
          status,
          claimedDate,
        };
        return updatedItem;
      }
      return item;
    });

    if (!updatedItem) {
      return null;
    }

    await this.saveAll(updated);
    return updatedItem;
  }

  async updateImage(id, imageUrl) {
    const reports = await this.findAll();
    let updatedItem = null;

    const updated = reports.map((item) => {
      if (String(item.id) === String(id)) {
        updatedItem = {
          ...item,
          imageUrl,
        };
        return updatedItem;
      }
      return item;
    });

    if (!updatedItem) {
      return null;
    }

    await this.saveAll(updated);
    return updatedItem;
  }

  async resetToSeed() {
    await this.saveAll(initialReports);
    return [...initialReports];
  }
}

export default new ReportRepository();
