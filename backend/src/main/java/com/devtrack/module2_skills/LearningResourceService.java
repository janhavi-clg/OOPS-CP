package com.devtrack.module2_skills;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service Layer for Learning Resources.
 * Handles adding, checking/unchecking completion, URL validation, and grouping by skill.
 */
@Service
public class LearningResourceService {

    // In-memory store: studentId -> List of LearningResource
    private final Map<String, List<LearningResource>> studentResourcesMap = new ConcurrentHashMap<>();

    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public LearningResourceService() {
        initRahulResources();
    }

    private void initRahulResources() {
        List<LearningResource> resources = new ArrayList<>();

        // Python Resources (8 total, 6 completed)
        resources.add(new LearningResource("res_py_1", DEMO_STUDENT_ID, "skill_py", "Python",
                "Python 3 Complete Masterclass: Syntax & Fundamentals", "YouTube",
                "https://www.youtube.com/watch?v=rfscVS0vtbw", "Video",
                "Core syntax, data types, loops, and control flow in modern Python.", true, "2025-08-10"));
        resources.add(new LearningResource("res_py_2", DEMO_STUDENT_ID, "skill_py", "Python",
                "Python Functions, Lambdas & Scope Resolution", "YouTube",
                "https://www.youtube.com/watch?v=u-OmVr_fT4s", "Video",
                "Function definitions, arbitrary arguments (*args, **kwargs), and closures.", true, "2025-08-15"));
        resources.add(new LearningResource("res_py_3", DEMO_STUDENT_ID, "skill_py", "Python",
                "Python OOP: Classes, Inheritance & Dunder Methods", "YouTube",
                "https://www.youtube.com/watch?v=JeznW_7DlB0", "Playlist",
                "Class design, encapsulation, dunder methods, and multiple inheritance.", true, "2025-09-02"));
        resources.add(new LearningResource("res_py_4", DEMO_STUDENT_ID, "skill_py", "Python",
                "Python File Handling, JSON & Context Managers", "Official Docs",
                "https://docs.python.org/3/tutorial/inputoutput.html", "Documentation",
                "Working with files, with-statements, reading/writing JSON datasets.", true, "2025-09-18"));
        resources.add(new LearningResource("res_py_5", DEMO_STUDENT_ID, "skill_py", "Python",
                "Python Virtual Environments & Pip Package Management", "Tutorial",
                "https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/", "Tutorial",
                "Virtual environment isolation, requirements.txt, and dependency resolution.", true, "2025-10-01"));
        resources.add(new LearningResource("res_py_6", DEMO_STUDENT_ID, "skill_py", "Python",
                "Python NumPy & Vectorized Computations", "Coursera",
                "https://www.coursera.org/learn/python-data-analysis", "Course",
                "N-dimensional arrays, broadcasting, and performance optimizations.", true, "2025-10-15"));
        resources.add(new LearningResource("res_py_7", DEMO_STUDENT_ID, "skill_py", "Python",
                "Python Multiprocessing & AsyncIO Architecture", "Documentation",
                "https://docs.python.org/3/library/asyncio.html", "Documentation",
                "Event loop, coroutines, async/await, and worker process pools.", false, null));
        resources.add(new LearningResource("res_py_8", DEMO_STUDENT_ID, "skill_py", "Python",
                "Building Scalable REST APIs with FastAPI & Pydantic", "YouTube",
                "https://www.youtube.com/watch?v=0sOvCWFmrtA", "Video",
                "Modern async web frameworks, dependency injection, and schemas.", false, null));

        // Java Resources (6 total, 4 completed)
        resources.add(new LearningResource("res_java_1", DEMO_STUDENT_ID, "skill_java", "Java",
                "Java 17 Fundamentals & JVM Architecture", "YouTube",
                "https://www.youtube.com/watch?v=A74TOX803D0", "Video",
                "JVM internals, bytecode execution, heap vs stack memory model.", true, "2025-07-20"));
        resources.add(new LearningResource("res_java_2", DEMO_STUDENT_ID, "skill_java", "Java",
                "Java OOP Deep Dive: Classes, Encapsulation & Inheritance", "YouTube",
                "https://www.youtube.com/watch?v=xk4_1vDrzzo", "Playlist",
                "Object modeling, abstract classes, interface contracts, polymorphism.", true, "2025-08-05"));
        resources.add(new LearningResource("res_java_3", DEMO_STUDENT_ID, "skill_java", "Java",
                "Java Collections Framework: Lists, Sets & Maps", "GeeksforGeeks",
                "https://www.geeksforgeeks.org/collections-in-java-2/", "Article",
                "ArrayList vs LinkedList, HashMap collisions, TreeSet comparators.", true, "2025-09-10"));
        resources.add(new LearningResource("res_java_4", DEMO_STUDENT_ID, "skill_java", "Java",
                "Java Generics & Type Erasure", "Oracle Docs",
                "https://docs.oracle.com/javase/tutorial/java/generics/", "Documentation",
                "Generic classes, bounded wildcards (? extends T), compiler erasure.", true, "2025-09-28"));
        resources.add(new LearningResource("res_java_5", DEMO_STUDENT_ID, "skill_java", "Java",
                "Java Streams, Lambdas & Functional Interfaces", "Udemy",
                "https://www.udemy.com/course/java-stream-api/", "Course",
                "Declarative data pipelines, map-filter-reduce, parallel streams.", false, null));
        resources.add(new LearningResource("res_java_6", DEMO_STUDENT_ID, "skill_java", "Java",
                "Java Multithreading, Concurrency & Thread Pools", "YouTube",
                "https://www.youtube.com/watch?v=r_MbozD32eo", "Video",
                "ExecutorService, volatile, synchronized blocks, atomic variables.", false, null));

        // DSA Resources (6 total, 3 completed)
        resources.add(new LearningResource("res_dsa_1", DEMO_STUDENT_ID, "skill_dsa", "DSA",
                "Asymptotic Notation & Time-Space Complexity Analysis", "YouTube",
                "https://www.youtube.com/watch?v=9TlHvipP5yA", "Video",
                "Big-O, Big-Omega, recurrence relations, Master Theorem.", true, "2025-08-12"));
        resources.add(new LearningResource("res_dsa_2", DEMO_STUDENT_ID, "skill_dsa", "DSA",
                "Arrays, Two Pointers & Sliding Window Patterns", "LeetCode",
                "https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/", "Course",
                "Fast & slow pointers, prefix sums, contiguous subarrays.", true, "2025-09-01"));
        resources.add(new LearningResource("res_dsa_3", DEMO_STUDENT_ID, "skill_dsa", "DSA",
                "Recursion & Backtracking Blueprint", "YouTube",
                "https://www.youtube.com/watch?v=wZnWmy0tqZ4", "Playlist",
                "Recursive call stacks, base conditions, state restoration.", true, "2025-09-22"));
        resources.add(new LearningResource("res_dsa_4", DEMO_STUDENT_ID, "skill_dsa", "DSA",
                "Trees & Binary Search Trees (BST) Traversals", "GeeksforGeeks",
                "https://www.geeksforgeeks.org/binary-tree-data-structure/", "Article",
                "Inorder, Preorder, Postorder, BFS Level-Order, Diameter.", false, null));
        resources.add(new LearningResource("res_dsa_5", DEMO_STUDENT_ID, "skill_dsa", "DSA",
                "Graph Algorithms: BFS, DFS, Dijkstra & Topological Sort", "YouTube",
                "https://www.youtube.com/watch?v=tWVWeAqZ0WU", "Playlist",
                "Adjacency lists, shortest paths, DAG cycle detection.", false, null));
        resources.add(new LearningResource("res_dsa_6", DEMO_STUDENT_ID, "skill_dsa", "DSA",
                "Dynamic Programming: 1D & 2D Memoization to Tabulation", "YouTube",
                "https://www.youtube.com/watch?v=oBt53YbR9Kk", "Video",
                "Subproblem overlapping, optimal substructure, knapsack patterns.", false, null));

        // React Resources (5 total, 2 completed)
        resources.add(new LearningResource("res_react_1", DEMO_STUDENT_ID, "skill_react", "React",
                "React 18 Crash Course: JSX, Components & Props", "YouTube",
                "https://www.youtube.com/watch?v=bMknfKXIFA8", "Video",
                "Component tree hierarchy, virtual DOM reconciliation, prop drilling.", true, "2025-09-14"));
        resources.add(new LearningResource("res_react_2", DEMO_STUDENT_ID, "skill_react", "React",
                "React Hooks: useState, useEffect & useRef In-Depth", "Official Docs",
                "https://react.dev/reference/react", "Documentation",
                "Lifecycle management, side-effects synchronization, ref persistence.", true, "2025-10-04"));
        resources.add(new LearningResource("res_react_3", DEMO_STUDENT_ID, "skill_react", "React",
                "State Management with Context API & Custom Hooks", "Article",
                "https://kentcdodds.com/blog/how-to-use-react-context-effectively", "Article",
                "Global state without Redux boilerplate, custom reusable hook encapsulation.", false, null));
        resources.add(new LearningResource("res_react_4", DEMO_STUDENT_ID, "skill_react", "React",
                "Client-Side Routing with React Router v6", "Tutorial",
                "https://reactrouter.com/en/main/start/tutorial", "Tutorial",
                "Dynamic route params, nested routes, route loaders.", false, null));
        resources.add(new LearningResource("res_react_5", DEMO_STUDENT_ID, "skill_react", "React",
                "React Performance Optimization: useMemo, useCallback & Profiler", "YouTube",
                "https://www.youtube.com/watch?v=DEPwA3mv_R8", "Video",
                "Preventing wasteful re-renders, React.memo, DevTools profiling.", false, null));

        // Machine Learning Resources (5 total, 2 completed)
        resources.add(new LearningResource("res_ml_1", DEMO_STUDENT_ID, "skill_ml", "Machine Learning",
                "Supervised Learning: Linear & Logistic Regression", "Coursera",
                "https://www.coursera.org/learn/machine-learning", "Course",
                "Cost functions, gradient descent optimization, binary classification.", true, "2025-08-20"));
        resources.add(new LearningResource("res_ml_2", DEMO_STUDENT_ID, "skill_ml", "Machine Learning",
                "Scikit-Learn Pipeline & Feature Engineering", "Official Docs",
                "https://scikit-learn.org/stable/modules/compose.html", "Documentation",
                "StandardScaler, OneHotEncoder, ColumnTransformer, Pipeline chaining.", true, "2025-09-15"));
        resources.add(new LearningResource("res_ml_3", DEMO_STUDENT_ID, "skill_ml", "Machine Learning",
                "Decision Trees, Random Forests & Ensemble Boosting", "YouTube",
                "https://www.youtube.com/watch?v=J4Wdy0Wc_xQ", "Video",
                "Gini impurity, information gain, bagging vs boosting, XGBoost.", false, null));
        resources.add(new LearningResource("res_ml_4", DEMO_STUDENT_ID, "skill_ml", "Machine Learning",
                "Unsupervised Learning: K-Means & PCA Dimensionality Reduction", "Article",
                "https://towardsdatascience.com/pca-using-python-scikit-learn-e653f8989e60", "Article",
                "Clustering centroids, elbow method, eigenvector projections.", false, null));
        resources.add(new LearningResource("res_ml_5", DEMO_STUDENT_ID, "skill_ml", "Machine Learning",
                "Model Evaluation Metrics: Precision, Recall, F1 & ROC-AUC", "Tutorial",
                "https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall", "Tutorial",
                "Confusion matrix, tradeoff thresholds, classification reports.", false, null));

        studentResourcesMap.put(DEMO_STUDENT_ID, resources);
    }

    public List<LearningResource> getResources(String studentId) {
        return studentResourcesMap.computeIfAbsent(studentId, k -> new ArrayList<>());
    }

    public List<LearningResource> getResourcesBySkill(String studentId, String skillId) {
        return getResources(studentId).stream()
                .filter(r -> r.getSkillId().equalsIgnoreCase(skillId))
                .collect(Collectors.toList());
    }

    public LearningResource addResource(String studentId, LearningResource resource) {
        if (resource.getTitle() == null || resource.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Resource title is required.");
        }
        if (resource.getSkillId() == null || resource.getSkillId().trim().isEmpty()) {
            throw new IllegalArgumentException("Resource must be associated with a skill.");
        }
        if (resource.getId() == null || resource.getId().trim().isEmpty()) {
            resource.setId("res_" + UUID.randomUUID().toString().substring(0, 8));
        }
        resource.setStudentId(studentId);
        getResources(studentId).add(resource);
        return resource;
    }

    public LearningResource toggleComplete(String studentId, String resourceId, boolean completed) {
        List<LearningResource> resources = getResources(studentId);
        LearningResource resource = resources.stream()
                .filter(r -> r.getId().equalsIgnoreCase(resourceId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Resource not found with ID: " + resourceId));

        resource.markCompleted(completed);
        return resource;
    }

    public boolean deleteResource(String studentId, String resourceId) {
        List<LearningResource> resources = getResources(studentId);
        return resources.removeIf(r -> r.getId().equalsIgnoreCase(resourceId));
    }

    public LearningResource updateResource(String studentId, String resourceId, LearningResource updated) {
        List<LearningResource> resources = getResources(studentId);
        LearningResource existing = resources.stream()
                .filter(r -> r.getId().equalsIgnoreCase(resourceId))
                .findFirst()
                .orElseThrow(() -> new NoSuchElementException("Resource not found with ID: " + resourceId));

        if (updated.getTitle() != null && !updated.getTitle().trim().isEmpty()) {
            existing.setTitle(updated.getTitle().trim());
        }
        if (updated.getPlatform() != null) {
            existing.setPlatform(updated.getPlatform());
        }
        if (updated.getUrl() != null) {
            existing.setUrl(updated.getUrl());
        }
        if (updated.getType() != null) {
            existing.setType(updated.getType());
        }
        if (updated.getDescription() != null) {
            existing.setDescription(updated.getDescription());
        }
        existing.touch();
        return existing;
    }
}
