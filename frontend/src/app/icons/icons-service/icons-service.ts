import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class IconsService {
  private cache = new Map<string, string>();

  async getIcon(name: string): Promise<string> {
    if (this.cache.has(name)) {
      return this.cache.get(name)!;
    } else {
      const response = await fetch(`/assets/icons/${name}.svg`);
      if (!response.ok) return "";
      const svg = await response.text();
      this.cache.set(name, svg);
      return svg;
    }
  }
}
