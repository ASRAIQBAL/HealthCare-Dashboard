[README.md](https://github.com/user-attachments/files/29291112/README.md)
# HealthCare-Dashboard
A responsive healthcare dashboard built with **Angular 21+** as part of a frontend developer assessment. The application displays patient data, diagnosis history, vital statistics, and lab results fetched from a live API.

🚧 Work in Progress: Features and UI are actively being refined.

# 🏥 Tech.Care — Healthcare Dashboard

A responsive healthcare dashboard built with **Angular 21+** as part of a frontend developer assessment. The application displays patient data, diagnosis history, vital statistics, and lab results fetched from a live API.

---

## 🚀 Getting Started

### Prerequisites

- Node.js v20.19.0
- npm v11.8.0
- Angular CLI v21.2.8

```bash
npm install -g @angular/cli
```

### Installation

```bash
extract HealthCareDashboard
open with vscode
npm install
```

### Run Development Server

```bash
ng serve
```

Navigate to `http://localhost:4200/dashboard`

---

## 📦 Versions

| Tool | Version |
|---|---|
| Angular CLI | 21.2.8 |
| Angular | 21.2.10 |
| Node.js | 20.19.0 |
| npm | 11.8.0 |
| TypeScript | 5.9.3 |
| RxJS | 7.8.2 |
| Vitest | 4.1.5 |

---

## 📁 Project Structure

```
src/
├── app/
│   ├── Core/
│   │   ├── Model.ts               # Interfaces: PatientInfo, DiagnosisList, LabResult, statusCard, NavBarItem
│   │   └── patient.ts             # Patient service — BehaviorSubjects, API calls, state management
│   ├── Features/
│   │   └── dashboard/
│   │       ├── dashboard.ts        # Main dashboard component
│   │       ├── dashboard.html
│   │       └── dashboard.scss
│   └── Shared/
│       └── Components/
│           ├── header-menu/        # Top navigation bar
│           ├── side-nav/           # Patient list sidebar
│           ├── profile-panel/      # Selected patient profile
│           ├── diagnosis-chart/    # Blood pressure line chart
│           └── stat-card/          # Reusable vital stats card
├── assets/
│   ├── icons/                      # SVG/PNG icons
│   └── images/                     # Logo and profile images
└── styles.scss                     # Global styles
```

---

## ✨ Features

### Patient Sidebar
- Fetches all patients from API via `Patient` service
- Displays patient list with profile picture, name, gender, age
- **Jessica Taylor** is selected by default on load
- Click any patient row to select them
- Inner scroll on patient list — sidebar stays fixed in viewport

### Diagnosis History Chart
- Blood pressure line chart (Systolic & Diastolic)
- Filtered to last 6 months

### Vital Stats Cards
- Respiratory Rate, Temperature, Heart Rate
- Values and status labels pulled from API response
- Default values shown immediately on load, updated reactively when API responds
- Null-safe subscriptions using RxJS `filter`

### Diagnosis List
- Table view of patient diagnoses with name, description, and status
- Hover row highlight with rounded corners

### Lab Results
- List of available lab tests with download icon
- Displayed in the right panel alongside the profile

### Header Navigation
- Active state on "Patients" tab
- Profile section with doctor name, role, settings and menu icons

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| Angular 21+ | Framework — standalone components, `@if`, `@for`, `@defer` |
| TypeScript 5.9 | Strongly typed models and services |
| RxJS 7.8 | BehaviorSubjects, Observables, `takeUntilDestroyed` |
| SCSS | Component-scoped styles, CSS Grid & Flexbox layout |
| Angular CommonModule | `AsyncPipe`, `NgClass` |

---

## 🧠 Key Angular Concepts Used

### Reactive State with BehaviorSubject
The `Patient` service manages all state via BehaviorSubjects, exposing Observables to components.

### Async Pipe
Patient list consumed directly in templates using `| async` — no manual subscription/unsubscription needed.

### Auto Unsubscribe with `takeUntilDestroyed`
Manual subscriptions use `takeUntilDestroyed(this.destroyRef)` from `@angular/core/rxjs-interop` to prevent memory leaks.

```typescript
this._pat.Patient$.pipe(
  filter(patients => !!patients && patients.length > 0),
  takeUntilDestroyed(this.destroyRef)
).subscribe(patients => {
  const jessica = patients.find(p => p.name === 'Jessica Taylor');
  if (jessica) this.selected = jessica.name;
});
```

### Null-safe Subscriptions
All subscriptions guard against null emissions before processing data:

```typescript
filter(patients => !!patients && patients.length > 0)
```

### Angular 17+ Control Flow
Uses the new built-in `@if`, `@for`, and `@defer` syntax instead of `*ngIf` / `*ngFor` directives.

```html
@if (patients$ | async; as patients) {
  @for (patient of patients; track patient.name) {
    ...
  }
}
```
### HTTP Interceptor with Basic Auth
All API requests are automatically authenticated using a functional `HttpInterceptorFn`.
Credentials are Base64-encoded and attached as an `Authorization` header on every outgoing request — no manual header setup needed in services.

### Sticky Sidebar Layout
The sidebar uses `position: sticky` with a fixed viewport height, while the center column grows naturally with content — giving the appearance of a fixed sidebar without breaking page scroll.

---

## 📐 Layout Architecture

```
dashboard-layout (CSS Grid: 280px | 1fr | 320px)
├── left-column    → sticky sidebar (patient list with inner scroll)
├── center-column  → diagnosis history + stat cards + diagnosis list
└── right-column   → sticky profile panel + lab results
```

---

## 🔧 Known Improvements (Given More Time)

- Add routing so clicking a patient updates the full dashboard
- Add search functionality in the patient sidebar
- Add loading skeletons instead of default placeholder values
- Unit tests with Vitest for the Patient service and Dashboard component
- Lazy load the dashboard feature module

---

## 👨‍💻 Author Asra Iqbal

Built as part of a frontend developer technical assessment.

<img width="1622" height="837" alt="image" src="https://github.com/user-attachments/assets/29a09681-74ba-421d-87af-4985e39d901b" />



<img width="1919" height="993" alt="RunningLocalhost2" src="https://github.com/user-attachments/assets/3fb0fd8d-54c7-4500-9b80-cd0c134be388" />


