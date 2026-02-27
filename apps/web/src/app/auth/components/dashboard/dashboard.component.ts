import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="min-h-screen bg-gray-50">
      <div class="max-w-3xl mx-auto py-10 px-4">
        <div class="flex items-center justify-between mb-6">
          <h1 class="text-2xl font-semibold text-gray-800">Dashboard</h1>
          <button
            (click)="onLogout()"
            class="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition"
          >
            Wyloguj
          </button>
        </div>

        <div class="bg-white rounded-lg shadow p-6 mb-6">
          <h2 class="text-lg font-medium text-gray-700 mb-4">Dane użytkownika</h2>
          @if (user()) {
            <div class="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
              <div>
                <span class="font-medium">ID:</span>
                <span class="ml-2">{{ user()?.id }}</span>
              </div>
              <div>
                <span class="font-medium">Email:</span>
                <span class="ml-2">{{ user()?.email }}</span>
              </div>
              <div>
                <span class="font-medium">Imię:</span>
                <span class="ml-2">{{ user()?.firstName || '-' }}</span>
              </div>
              <div>
                <span class="font-medium">Nazwisko:</span>
                <span class="ml-2">{{ user()?.lastName || '-' }}</span>
              </div>
            </div>
          } @else {
            <p class="text-gray-500">Brak danych użytkownika.</p>
          }
        </div>

        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-lg font-medium text-gray-700 mb-4">Akcje testowe</h2>
          <div class="flex gap-3">
            <button
              (click)="testProtectedApi()"
              class="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition"
            >
              Testuj chronione API
            </button>
            <button
              (click)="simulateTokenExpiry()"
              class="px-4 py-2 bg-yellow-600 text-white rounded-md hover:bg-yellow-700 transition"
            >
              Usuń accessToken (wymuś refresh)
            </button>
          </div>
          @if (apiMessage()) {
            <p class="mt-4 text-sm text-gray-700">{{ apiMessage() }}</p>
          }
        </div>
      </div>
    </div>
  `,
})
export class DashboardComponent {
  private readonly auth = inject(AuthService);
  private readonly router = inject(Router);
  private readonly http = inject(HttpClient);

  readonly user = this.auth.currentUser;
  readonly apiMessage = signal<string | null>(null);

  onLogout() {
    this.auth.logout();
  }

  testProtectedApi() {
    // przykładowe wywołanie chronionego endpointu
    this.http.get('http://localhost:3000/api/users').subscribe({
      next: (res) => this.apiMessage.set('Sukces: ' + JSON.stringify(res)),
      error: (err) => this.apiMessage.set('Błąd: ' + (err?.message || 'Unknown error')),
    });
  }

  simulateTokenExpiry() {
    localStorage.removeItem('accessToken');
    this.apiMessage.set('Usunięto accessToken. Następne żądanie powinno wywołać refresh.');
  }
}
