package com.test.Reporter.controllers;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.test.Reporter.services.ReportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/reports")
public class ReportController {
    private final ReportService reportService;

    @Autowired
    public ReportController(ReportService reportService) {
        this.reportService = reportService;
    }

    @GetMapping("/all")
    public JsonArray getAllReports() {
        return reportService.getAllReports();
    }

    @PostMapping("/byId")
    public JsonObject getReportById(@RequestParam Long reportId) {
        if (reportId == null) {
            throw new IllegalArgumentException("Report id must not be null!");
        }
        return reportService.getReportById(reportId);
    }

    @PostMapping("/new")
    public void createNewReport(@RequestParam String theme,
                                @RequestParam String date,
                                @RequestParam String speaker) {
        if (theme == null || speaker == null || date == null) {
            throw new IllegalArgumentException("There is no theme OR speaker OR date parameters!");
        }
        LocalDate newDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        reportService.createNewReport(theme, newDate, speaker);
    }

    @PostMapping("/update")
    public void updateReport(@RequestParam Long id,
                             @RequestParam String theme,
                             @RequestParam String date,
                             @RequestParam String speaker) {
        if (id == null || theme == null || speaker == null || date == null) {
            throw new IllegalArgumentException("There is no id OR theme OR speaker OR date parameters!");
        }
        LocalDate newDate = LocalDate.parse(date, DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        reportService.updateReport(id, theme, newDate, speaker);
    }

    @PostMapping("/delete/byId")
    public void deleteReportById(@RequestParam Long reportId) {
        if (reportId == null) {
            throw new IllegalArgumentException("Report id must not be null!");
        }
        reportService.deleteReportById(reportId);
    }

    @PostMapping("/delete/byIds")
    public void deleteReportsByIds(@RequestParam String reportsIds) {
        if (reportsIds == null) {
            throw new IllegalArgumentException("Reports ids must not be null!");
        }

        if (!reportsIds.isEmpty()) {
            List<Long> reportsIdsList = getReportsIdsListFromString(reportsIds);
            reportService.deleteReportsByIds(reportsIdsList);
        }
    }

    private List<Long> getReportsIdsListFromString(String reportsIds) {
        return Arrays.stream(reportsIds.split(",")).map(Long::parseLong).collect(Collectors.toList());
    }
}
