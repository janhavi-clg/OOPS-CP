package com.devtrack.core.oop;

/**
 * Interface demonstrating OOP Abstraction and Polymorphism.
 * Any entity whose progress can be quantified implements this contract.
 */
public interface ProgressCalculable {
    /**
     * Calculates the completion or proficiency percentage (0.0 to 100.0).
     * @return double representing percentage
     */
    double calculateProgressPercentage();

    /**
     * Returns a human-readable status derived from the progress.
     * @return Status string (e.g., "Beginner", "Proficient", "Completed")
     */
    String getProgressStatus();
}
