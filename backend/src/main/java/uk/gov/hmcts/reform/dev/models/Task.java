package uk.gov.hmcts.reform.dev.models;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Task {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(nullable = false)
    private String caseNumber;

    @Column(nullable = false)
    private String title;

    @Column
    private String description; // description as optional field
    
    @Column(nullable = false)
    private String status;

    @Column(name = "created_date", updatable = false)
    private LocalDateTime createdDate;

    @Column(name = "due_date_time")
    private LocalDateTime dueDateTime;
}
