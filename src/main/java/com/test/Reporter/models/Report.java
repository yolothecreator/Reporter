package com.test.Reporter.models;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.Objects;

@Entity
@Table(name = "report")
public class Report {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @SequenceGenerator(name = "report_id_seq")
    private Long id;

    private String theme;
    private LocalDate date;
    private String speaker;

    public Report() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTheme() {
        return theme;
    }

    public void setTheme(String theme) {
        this.theme = theme;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getSpeaker() {
        return speaker;
    }

    public void setSpeaker(String speaker) {
        this.speaker = speaker;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Report report = (Report) o;
        return Objects.equals(id, report.id) &&
                Objects.equals(theme, report.theme) &&
                Objects.equals(date, report.date) &&
                Objects.equals(speaker, report.speaker);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id, theme, date, speaker);
    }

    @Override
    public String toString() {
        return "Report:" +
                "id=" + id +
                ", theme='" + theme + '\'' +
                ", date=" + date +
                ", speaker='" + speaker + '\'';
    }
}
