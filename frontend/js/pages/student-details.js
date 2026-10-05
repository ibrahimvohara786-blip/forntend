const studentRecords = {
	'BA-1001': { name: 'Olivia Martin', className: 'Class 10-A', initials: 'OM', attendance: 94, present: 142, days: 151 },
	'BA-1002': { name: 'Liam Johnson', className: 'Class 10-A', initials: 'LJ', attendance: 89, present: 134, days: 151 },
	'BA-1003': { name: 'Sophia Garcia', className: 'Class 9-B', initials: 'SG', attendance: 96, present: 145, days: 151 },
	'BA-1004': { name: 'Noah Williams', className: 'Class 8-B', initials: 'NW', attendance: 78, present: 118, days: 151 },
	'BA-1005': { name: 'Mia Patel', className: 'Class 9-A', initials: 'MP', attendance: 92, present: 139, days: 151 },
	'BA-1006': { name: 'Ethan Brooks', className: 'Class 7-C', initials: 'EB', attendance: 86, present: 130, days: 151 },
	'BA-1007': { name: 'Ava Chen', className: 'Class 10-A', initials: 'AC', attendance: 97, present: 146, days: 151 },
	'BA-1008': { name: 'Lucas Reed', className: 'Class 8-A', initials: 'LR', attendance: 93, present: 140, days: 151 }
};

window.addEventListener('beaccurate:ready', () => {
	const host = document.querySelector('#page-content');
	if (!host) return;

	const roll = new URLSearchParams(location.search).get('id') || 'BA-1001';
	const student = studentRecords[roll] || studentRecords['BA-1001'];
	const emailName = student.name.toLowerCase().replaceAll(' ', '.');

	host.innerHTML = `<div class="page-heading"><div><a href="students.html">← Students</a><h1 style="margin-top:8px">Student profile</h1></div><button class="button" id="print-profile">Print profile</button></div>
		<div class="grid grid-2"><section class="card"><div class="student-profile"><span class="avatar">${student.initials}</span><div><h2 style="margin:0 0 4px">${student.name}</h2><span class="muted">${roll} · ${student.className}</span><p><span class="status">Active student</span></p></div></div>
		<div class="form-grid"><div><span class="muted">Email</span><p>${emailName}@school.edu</p></div><div><span class="muted">Enrollment</span><p>August 2023</p></div><div><span class="muted">Guardian</span><p>Jordan ${student.name.split(' ')[1]}</p></div><div><span class="muted">Contact</span><p>+1 (555) 014-2030</p></div></div></section>
		<section class="card"><h2>Attendance rate</h2><div class="row"><div class="attendance-ring"><span>${student.attendance}%</span></div><div><strong>${student.attendance >= 90 ? 'Excellent attendance' : 'Attendance needs attention'}</strong><p class="muted">Present ${student.present} of ${student.days} school days</p><span class="status">Current term</span></div></div></section></div>
		<section class="card" style="margin-top:20px"><h2>Recent attendance</h2><div class="table-wrap"><table><thead><tr><th>Date</th><th>Class</th><th>Check-in</th><th>Status</th></tr></thead><tbody><tr><td>Oct 03, 2026</td><td>${student.className}</td><td>08:04 AM</td><td><span class="status">Present</span></td></tr><tr><td>Oct 02, 2026</td><td>${student.className}</td><td>08:16 AM</td><td><span class="status warning">Late</span></td></tr><tr><td>Oct 01, 2026</td><td>${student.className}</td><td>08:01 AM</td><td><span class="status">Present</span></td></tr><tr><td>Sep 30, 2026</td><td>${student.className}</td><td>—</td><td><span class="status danger">Absent</span></td></tr></tbody></table></div></section>`;
	document.querySelector('#print-profile').addEventListener('click', () => window.print());
});
