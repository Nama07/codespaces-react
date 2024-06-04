import React, { useState, useEffect } from 'react';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import "./Report.css";
const ReportsList = () => {
  const [reports, setReports] = useState([]);
  const [filters, setFilters] = useState({
    startDate: '',
    endDate: '',
    type: '',
    severity: '',
    name: '', 
  });
  const [selectedReports, setSelectedReports] = useState([]);

  useEffect(() => {
    const storedReports = JSON.parse(localStorage.getItem('reports')) || [];
    setReports(storedReports);
  }, []);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters({ ...filters, [name]: value });
  };

  const applyFilters = (reports) => {
    return reports.filter((report) => {
      const reportDate = new Date(report.timestamp);
      const startDate = filters.startDate ? new Date(filters.startDate) : null;
      const endDate = filters.endDate ? new Date(filters.endDate) : null;

      const isWithinDateRange = (!startDate || reportDate >= startDate) && (!endDate || reportDate <= endDate);
      const isMatchingType = filters.type ? report.type === filters.type : true;
      const isMatchingSeverity = filters.severity ? report.severity === filters.severity : true;
      const isMatchingName = filters.name ? report.name.toLowerCase().includes(filters.name.toLowerCase()) : true;

      return isWithinDateRange && isMatchingType && isMatchingSeverity && isMatchingName;
    });
  };

  const handleSelectReport = (e, report) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedReports([...selectedReports, report]);
    } else {
      setSelectedReports(selectedReports.filter((r) => r.id !== report.id));
    }
  };

  const exportToPDF = () => {
    selectedReports.forEach((report) => {
      const doc = new jsPDF();

      doc.text(`Report: ${report.name}`, 20, 10);

      doc.autoTable({
        head: [['ID', 'Name', 'Type', 'Severity', 'Timestamp', 'Description']],
        body: [[report.id, report.name, report.type, report.severity, report.timestamp, report.description]],
      });

      doc.save(`${report.name}_report.pdf`);
    });
  };

  const filteredReports = applyFilters(reports);

  return (
    <div className="container mt-5">
      <h2>Reports List</h2>
      <div className="form-row mb-4">
        <div className="col">
          <label htmlFor="startDate">Nejdřívější datum</label>
          <input
            type="date"
            className="form-control"
            id="startDate"
            name="startDate"
            value={filters.startDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <label htmlFor="endDate">Nejpozdější datum</label>
          <input
            type="date"
            className="form-control"
            id="endDate"
            name="endDate"
            value={filters.endDate}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <label htmlFor="type">Typ</label>
          <input
            type="text"
            className="form-control"
            id="type"
            name="type"
            value={filters.type}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <label htmlFor="severity">Závažnost</label>
          <input
            type="text"
            className="form-control"
            id="severity"
            name="severity"
            value={filters.severity}
            onChange={handleFilterChange}
          />
        </div>
        <div className="col">
          <label htmlFor="name">Název</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={filters.name}
            onChange={handleFilterChange}
          />
        </div>
      </div>
      <button className="btn btn-primary mb-4" onClick={exportToPDF} disabled={selectedReports.length === 0}>
        Export Selected to PDF
      </button>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Select</th>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Severity</th>
            <th>Timestamp</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          {filteredReports.map((report, index) => (
            <tr key={report.id}>
              <td>
                <input
                  type="checkbox"
                  onChange={(e) => handleSelectReport(e, report)}
                />
              </td>
              <td>{report.id}</td>
              <td>{report.name}</td>
              <td>{report.type}</td>
              <td>{report.severity}</td>
              <td>{report.timestamp}</td>
              <td>{report.description}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportsList;
