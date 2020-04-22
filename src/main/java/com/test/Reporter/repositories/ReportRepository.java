package com.test.Reporter.repositories;

import com.test.Reporter.models.Report;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ReportRepository extends JpaRepository<Report, Long> {
    Report findReportById(Long id);
}
