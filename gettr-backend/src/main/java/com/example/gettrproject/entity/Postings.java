package com.example.gettrproject.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "postings")
public class Postings {
    @Id
    private String title;
    private String description;
    private int likes;
}
