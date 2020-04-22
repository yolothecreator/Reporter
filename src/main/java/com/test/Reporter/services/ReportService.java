package com.test.Reporter.services;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.test.Reporter.models.Report;
import com.test.Reporter.repositories.ReportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;

@Service
public class ReportService {
    private final ReportRepository reportRepository;

    @Autowired
    public ReportService(ReportRepository reportRepository) {
        this.reportRepository = reportRepository;
    }

    public JsonArray getAllReports(){
        List<Report> allReports = reportRepository.findAll();

        JsonArray reportsJsonArray = new JsonArray();
        for (Report report : allReports) {
            JsonObject reportJson = new JsonObject();
            reportJson.addProperty("key", report.getId());
            reportJson.addProperty("theme", report.getTheme());
            reportJson.addProperty("speaker", report.getSpeaker());
            reportJson.addProperty("date", report.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));
            reportsJsonArray.add(reportJson);
        }

        return reportsJsonArray;
    }

    public JsonObject getReportById(Long reportId){
        Report report = reportRepository.findReportById(reportId);

        if (report == null){
            throw new NullPointerException("There is no report with id: " + reportId);
        }

        JsonObject reportJson = new JsonObject();
        reportJson.addProperty("id", reportId);
        reportJson.addProperty("theme", report.getTheme());
        reportJson.addProperty("speaker", report.getSpeaker());
        reportJson.addProperty("date", report.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")));

        return reportJson;
    }

    public void createNewReport(String theme, LocalDate date, String speaker){
        Report report = new Report();
        report.setTheme(theme);
        report.setSpeaker(speaker);
        report.setDate(date);

        reportRepository.save(report);
    }

    public void deleteReportById(Long reportId){
        reportRepository.deleteById(reportId);
    }

    public void deleteReportsByIds(List<Long> reportsIdsListFromString) {
        for (Long reportId: reportsIdsListFromString) {
            deleteReportById(reportId);
        }
    }

    public void updateReport(Long id, String theme, LocalDate date, String speaker) {
        Report reportById = reportRepository.findReportById(id);

        reportById.setTheme(theme);
        reportById.setDate(date);
        reportById.setSpeaker(speaker);

        reportRepository.save(reportById);
    }
}
