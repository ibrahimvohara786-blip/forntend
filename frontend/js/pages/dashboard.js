const status = {
  present: 94,
  late: 3,
  absent: 2,
  onLeave: 12,
  total: 120,
  marked: 114,
  pending: 6,
  trends: { present: 2, late: 1, absent: 1 }
};
const dashboardData = {
  seats: ['p','p','p','a','p','p','p','p','p','p','a','p','p','p','p','p','p','p','a','p','p','p','p','p'],
  days: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'], present: [91,93,94,92,96,94,95], absent: [9,7,6,8,4,6,5],
  classes: ['Class 7','Class 8','Class 9','Class 10'], presentByClass: [86,91,94,89], absentByClass: [8,5,3,7], leaveByClass: [6,4,3,4],
  risks: [{name:'Noah Williams', cls:'Class 8-B', risk:78, initials:'NW'}, {name:'Mia Patel', cls:'Class 9-A', risk:64, initials:'MP'}, {name:'Ethan Brooks', cls:'Class 7-C', risk:53, initials:'EB'}, {name:'Ava Chen', cls:'Class 10-A', risk:42, initials:'AC'}]
};

// Build the card from the demo values in the status object above.
function renderStatusCard() {
  const date = new Intl.DateTimeFormat('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  }).format(new Date());
  const tiles = [
    { label: 'Present', value: status.present, suffix: '%', tone: 'present', trend: `${status.trends.present}% vs yesterday`, trendTone: 'positive', icon: '<circle cx="12" cy="12" r="9"/><path d="m8 12 2.5 2.5L16 9"/>' },
    { label: 'Late', value: status.late, suffix: '%', tone: 'late', trend: `${status.trends.late}% vs yesterday`, trendTone: 'positive-down', icon: '<path d="M12 3 22 20H2L12 3Z"/><path d="M12 9v5m0 3h.01"/>' },
    { label: 'Absent', value: status.absent, suffix: '%', tone: 'absent', trend: `${status.trends.absent}% vs yesterday`, trendTone: 'negative', icon: '<circle cx="12" cy="12" r="9"/><path d="m9 9 6 6m0-6-6 6"/>' },
    { label: 'On Leave', value: status.onLeave, suffix: '', tone: 'on-leave', trend: 'No change vs yesterday', trendTone: 'neutral', icon: '<rect x="3" y="5" width="18" height="16" rx="2"/><path d="M16 3v4M8 3v4M3 10h18"/>' }
  ];

  return `<article class="card status-card">
    <header class="status-header">
      <div><h2>Today's Status</h2><p>${date}</p></div>
      <span class="live-badge"><span class="live-dot"></span>Live</span>
    </header>
    <div class="status-main">
      <div class="status-ring-wrap">
        <div class="status-ring">
          <svg viewBox="0 0 160 160" aria-hidden="true">
            <circle class="ring-track" cx="80" cy="80" r="68" pathLength="100" />
            <circle class="ring-progress" cx="80" cy="80" r="68" pathLength="100" stroke-dasharray="100" stroke-dashoffset="100" />
          </svg>
          <div class="ring-copy"><strong data-count="${status.present}" data-suffix="%">0%</strong><span>Present</span></div>
        </div>
        <span class="ring-caption">Attendance Rate</span>
      </div>
      <div class="status-tiles">
        ${tiles.map((tile) => `<article class="status-tile ${tile.tone}">
          <div class="tile-top">
            <span class="tile-icon"><svg viewBox="0 0 24 24" aria-hidden="true">${tile.icon}</svg></span>
            <strong data-count="${tile.value}" data-suffix="${tile.suffix}">0${tile.suffix}</strong>
          </div>
          <span class="tile-label">${tile.label}</span>
          <span class="tile-trend ${tile.trendTone}">${tile.trend}</span>
        </article>`).join('')}
      </div>
    </div>
    <footer class="status-footer">
      <div class="status-facts">
        <span class="status-fact"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="9" cy="8" r="3"/><path d="M3 20v-2a6 6 0 0 1 12 0v2M16 5a3 3 0 0 1 0 6m2 3a5 5 0 0 1 3 5v1"/></svg>Total: ${status.total}</span>
        <span class="status-fact"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4 4L19 6"/></svg>Marked: ${status.marked}</span>
        <span class="status-fact"><svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M12 8v8m-4-4h8"/></svg>Pending: ${status.pending}</span>
      </div>
      <svg class="status-sparkline" viewBox="0 0 112 32" role="img" aria-label="Attendance trend over seven days">
        <polyline points="2,24 20,18 38,21 56,11 74,15 92,7 108,10" />
        <circle cx="108" cy="10" r="3" />
      </svg>
    </footer>
  </article>`;
}

// Skip count-up and ring transitions when reduced motion is preferred.
function animateStatusCard(card) {
  const progressRing = card.querySelector('.ring-progress');
  const numbers = card.querySelectorAll('[data-count]');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function countUp(element) {
    const target = Number(element.dataset.count);
    const suffix = element.dataset.suffix;

    if (reducedMotion) {
      element.textContent = `${target}${suffix}`;
      return;
    }

    const startedAt = performance.now();
    function updateNumber(now) {
      const progress = Math.min((now - startedAt) / 1000, 1);
      element.textContent = `${Math.floor(target * progress)}${suffix}`;
      if (progress < 1) requestAnimationFrame(updateNumber);
    }
    requestAnimationFrame(updateNumber);
  }

  numbers.forEach(countUp);
  if (reducedMotion) {
    progressRing.style.strokeDashoffset = String(100 - status.present);
    return;
  }
  requestAnimationFrame(() => {
    progressRing.style.strokeDashoffset = String(100 - status.present);
  });
}

function renderForecastChart() {
  const xPositions = dashboardData.days.map((day, index) => 48 + index * 54);
  const pointList = (values) => values.map((value, index) => `${xPositions[index]},${184 - value * 1.32}`).join(' ');
  const gridLines = [0, 25, 50, 75, 100].map((value) => {
    const y = 184 - value * 1.32;
    return `<path d="M42 ${y}H392"/>`;
  }).join('');
  const yLabels = [0, 25, 50, 75, 100].map((value) => `<text x="4" y="${188 - value * 1.32}">${value}%</text>`).join('');

  return `<svg viewBox="0 0 400 220" role="img" aria-label="Weekly predicted present and absent chart">
    <g fill="none" stroke="rgba(251,245,225,.16)" stroke-width="1">${gridLines}</g>
    <g fill="#D9D1BC" font-size="10">${yLabels}</g>
    <g fill="#D9D1BC" font-size="11">${dashboardData.days.map((day, index) => `<text x="${xPositions[index]}" y="210" text-anchor="middle">${day}</text>`).join('')}</g>
    <polyline points="${pointList(dashboardData.present)}" fill="none" stroke="#67C777" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <polyline points="${pointList(dashboardData.absent)}" fill="none" stroke="#EE7770" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <g fill="#67C777">${dashboardData.present.map((value, index) => `<circle cx="${xPositions[index]}" cy="${184 - value * 1.32}" r="3"/>`).join('')}</g>
    <g fill="#EE7770">${dashboardData.absent.map((value, index) => `<circle cx="${xPositions[index]}" cy="${184 - value * 1.32}" r="3"/>`).join('')}</g>
  </svg>`;
}

function renderClassChart() {
  const barPositions = [88, 166, 244, 322];
  const baseline = 184;
  const scale = 1.32;
  const series = [
    { values: dashboardData.presentByClass, color: '#3E9B4F' },
    { values: dashboardData.absentByClass, color: '#C94040' },
    { values: dashboardData.leaveByClass, color: '#D9A21B' }
  ];
  const bars = barPositions.map((x, index) => {
    let bottom = baseline;
    const segments = series.map(({ values, color }) => {
      const height = values[index] * scale;
      bottom -= height;
      return `<rect x="${x}" y="${bottom}" width="42" height="${height}" fill="${color}"/>`;
    }).join('');
    return segments;
  }).join('');
  const gridLines = [0, 25, 50, 75, 100].map((value) => {
    const y = baseline - value * scale;
    return `<path d="M42 ${y}H384"/>`;
  }).join('');
  const yLabels = [0, 25, 50, 75, 100].map((value) => `<text x="2" y="${baseline + 4 - value * scale}">${value}%</text>`).join('');

  return `<svg viewBox="0 0 400 220" role="img" aria-label="Stacked attendance by class">
    <g fill="none" stroke="rgba(20,17,12,.12)" stroke-width="1">${gridLines}</g>
    <g fill="var(--muted)" font-size="10">${yLabels}</g>
    <g>${bars}</g>
    <g fill="var(--muted)" font-size="10">${dashboardData.classes.map((name, index) => `<text x="${barPositions[index] + 21}" y="205" text-anchor="middle">${name.replace('Class ', '')}</text>`).join('')}</g>
  </svg>`;
}

window.addEventListener('beaccurate:ready', () => {
  const host = document.querySelector('#page-content');
  if (!host) return;
  host.innerHTML = `
    <div class="page-heading">
      <div><h1>Good morning, Alex</h1><p>Here is your attendance overview for today, October 3.</p></div>
      <a class="button button-primary" href="attendance.html">Take attendance</a>
    </div>
    <section class="dashboard-grid">
      ${renderStatusCard()}
      <article class="card">
        <h2>Live Presence</h2>
        <div class="seat-map" role="img" aria-label="Seat map with 21 present and 3 absent">${dashboardData.seats.map((s) => `<span class="seat ${s === 'a' ? 'absent' : ''}"></span>`).join('')}</div>
        <div class="legend"><span><i></i>Present</span><span><i class="absent-dot"></i>Absent</span></div>
      </article>
      <article class="card card-dark forecast-card">
        <div class="forecast-head"><div><h2>AI Weekly Forecast</h2><span class="muted">Predicted attendance</span></div><span class="forecast-badge">98.2% accuracy</span></div>
        <div class="chart-box">${renderForecastChart()}</div>
      </article>
      <article class="card overview-card">
        <h2>Department / Class Overview</h2>
        <div class="chart-box">${renderClassChart()}</div>
        <div class="legend"><span><i></i>Present</span><span><i class="absent-dot"></i>Absent</span><span><i style="background:#D9A21B"></i>On leave</span></div>
      </article>
      <article class="card">
        <h2>AI Risk List</h2>
        ${dashboardData.risks.map((s) => `<div class="risk-item"><span class="avatar" aria-hidden="true">${s.initials}</span><div class="risk-meter"><strong>${s.name}</strong><small>${s.cls}</small><div class="progress"><span style="width:${s.risk}%"></span></div></div><b>${s.risk}%</b></div>`).join('')}
      </article>
    </section>`;
  animateStatusCard(host.querySelector('.status-card'));
});
