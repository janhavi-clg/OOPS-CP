package com.devtrack.module2_skills;

import org.springframework.stereotype.Service;
import java.util.*;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

/**
 * Service Layer for Practice Problems.
 * Manages solved programming problems, difficulty levels, platforms, and stored solution code.
 * IMPORTANT: User code is stored solely for reference/display and is never executed.
 */
@Service
public class PracticeProblemService {

    // In-memory store: studentId -> List of PracticeProblem
    private final Map<String, List<PracticeProblem>> studentProblemsMap = new ConcurrentHashMap<>();

    private final String DEMO_STUDENT_ID = "stu_rahul_01";

    public PracticeProblemService() {
        initRahulProblems();
    }

    private void initRahulProblems() {
        List<PracticeProblem> problems = new ArrayList<>();

        // 1. Two Sum (Python)
        problems.add(new PracticeProblem(
                "prob_1", "Two Sum", "skill_py", "Python", DEMO_STUDENT_ID,
                "LeetCode", "https://leetcode.com/problems/two-sum/", "Easy", "2025-09-05",
                "Solved using hash map for O(n) single-pass lookup instead of brute-force O(n^2).",
                new ProblemSolution("Python",
                        "class Solution:\n    def twoSum(self, nums: list[int], target: int) -> list[int]:\n        prev_map = {}  # val -> index\n        for i, n in enumerate(nums):\n            diff = target - n\n            if diff in prev_map:\n                return [prev_map[diff], i]\n            prev_map[n] = i\n        return []",
                        "Key takeaway: Trading space O(n) for time O(n) using a hash map.")
        ));

        // 2. Valid Parentheses (Python)
        problems.add(new PracticeProblem(
                "prob_2", "Valid Parentheses", "skill_py", "Python", DEMO_STUDENT_ID,
                "LeetCode", "https://leetcode.com/problems/valid-parentheses/", "Easy", "2025-09-12",
                "Stack data structure where closing brackets must match top opening bracket.",
                new ProblemSolution("Python",
                        "class Solution:\n    def isValid(self, s: str) -> bool:\n        stack = []\n        close_to_open = {')': '(', ']': '[', '}': '{'}\n        for c in s:\n            if c in close_to_open:\n                if stack and stack[-1] == close_to_open[c]:\n                    stack.pop()\n                else:\n                    return False\n            else:\n                stack.append(c)\n        return True if not stack else False",
                        "Ensure stack is empty at the end to guarantee every bracket was matched.")
        ));

        // 3. Reverse String (Python)
        problems.add(new PracticeProblem(
                "prob_3", "Reverse String In-Place", "skill_py", "Python", DEMO_STUDENT_ID,
                "LeetCode", "https://leetcode.com/problems/reverse-string/", "Easy", "2025-09-18",
                "Two pointers left and right swapping until left >= right.",
                new ProblemSolution("Python",
                        "class Solution:\n    def reverseString(self, s: list[str]) -> None:\n        left, right = 0, len(s) - 1\n        while left < right:\n            s[left], s[right] = s[right], s[left]\n            left += 1\n            right -= 1",
                        "O(1) memory complexity, O(n) time.")
        ));

        // 4. Binary Search (Java)
        problems.add(new PracticeProblem(
                "prob_4", "Binary Search", "skill_java", "Java", DEMO_STUDENT_ID,
                "LeetCode", "https://leetcode.com/problems/binary-search/", "Easy", "2025-09-22",
                "Classic iterative binary search with overflow prevention in midpoint calculation.",
                new ProblemSolution("Java",
                        "class Solution {\n    public int search(int[] nums, int target) {\n        int left = 0, right = nums.length - 1;\n        while (left <= right) {\n            int mid = left + (right - left) / 2;\n            if (nums[mid] == target) return mid;\n            else if (nums[mid] < target) left = mid + 1;\n            else right = mid - 1;\n        }\n        return -1;\n    }\n}",
                        "Always use left + (right - left) / 2 to avoid integer overflow.")
        ));

        // 5. Palindrome Number (Java)
        problems.add(new PracticeProblem(
                "prob_5", "Palindrome Number", "skill_java", "Java", DEMO_STUDENT_ID,
                "LeetCode", "https://leetcode.com/problems/palindrome-number/", "Easy", "2025-09-25",
                "Revert half of the integer digits mathematically without string conversion.",
                new ProblemSolution("Java",
                        "class Solution {\n    public boolean isPalindrome(int x) {\n        if (x < 0 || (x % 10 == 0 && x != 0)) return false;\n        int revertedNumber = 0;\n        while (x > revertedNumber) {\n            revertedNumber = revertedNumber * 10 + x % 10;\n            x /= 10;\n        }\n        return x == revertedNumber || x == revertedNumber / 10;\n    }\n}",
                        "Halving the digits avoids 32-bit overflow entirely.")
        ));

        // 6. Array Rotation by K Steps (Java)
        problems.add(new PracticeProblem(
                "prob_6", "Rotate Array", "skill_java", "Java", DEMO_STUDENT_ID,
                "GeeksforGeeks", "https://practice.geeksforgeeks.org/problems/rotate-array-by-n-elements/", "Medium", "2025-10-02",
                "Reversal algorithm: reverse whole array, reverse first k, reverse remaining.",
                new ProblemSolution("Java",
                        "class Solution {\n    public void rotate(int[] nums, int k) {\n        k %= nums.length;\n        reverse(nums, 0, nums.length - 1);\n        reverse(nums, 0, k - 1);\n        reverse(nums, k, nums.length - 1);\n    }\n    private void reverse(int[] nums, int start, int end) {\n        while (start < end) {\n            int temp = nums[start];\n            nums[start++] = nums[end];\n            nums[end--] = temp;\n        }\n    }\n}",
                        "Triple reversal is clean O(1) space.")
        ));

        // 7. Frequency Counter / Top K Frequent Elements (DSA)
        problems.add(new PracticeProblem(
                "prob_7", "Top K Frequent Elements", "skill_dsa", "DSA", DEMO_STUDENT_ID,
                "LeetCode", "https://leetcode.com/problems/top-k-frequent-elements/", "Medium", "2025-09-28",
                "Bucket sort approach to achieve O(n) linear time instead of heap O(n log k).",
                new ProblemSolution("Java",
                        "import java.util.*;\n\nclass Solution {\n    public int[] topKFrequent(int[] nums, int k) {\n        Map<Integer, Integer> count = new HashMap<>();\n        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);\n        List<Integer>[] bucket = new List[nums.length + 1];\n        for (int key : count.keySet()) {\n            int freq = count.get(key);\n            if (bucket[freq] == null) bucket[freq] = new ArrayList<>();\n            bucket[freq].add(key);\n        }\n        int[] res = new int[k];\n        int idx = 0;\n        for (int i = bucket.length - 1; i >= 0 && idx < k; i--) {\n            if (bucket[i] != null) {\n                for (int num : bucket[i]) {\n                    res[idx++] = num;\n                    if (idx == k) break;\n                }\n            }\n        }\n        return res;\n    }\n}",
                        "Bucket index represents frequency count.")
        ));

        // 8. Longest Substring Without Repeating Characters (DSA)
        problems.add(new PracticeProblem(
                "prob_8", "Longest Substring Without Repeating Characters", "skill_dsa", "DSA", DEMO_STUDENT_ID,
                "LeetCode", "https://leetcode.com/problems/longest-substring-without-repeating-characters/", "Medium", "2025-10-03",
                "Sliding window with Set to maintain unique characters within [left, right].",
                new ProblemSolution("Python",
                        "class Solution:\n    def lengthOfLongestSubstring(self, s: str) -> int:\n        char_set = set()\n        l = 0\n        res = 0\n        for r in range(len(s)):\n            while s[r] in char_set:\n                char_set.remove(s[l])\n                l += 1\n            char_set.add(s[r])\n            res = max(res, r - l + 1)\n        return res",
                        "Sliding window scales gracefully in O(n) time.")
        ));

        // 9. Simple Linear Regression Gradient Descent (Machine Learning)
        problems.add(new PracticeProblem(
                "prob_9", "Gradient Descent for Univariate Linear Regression", "skill_ml", "Machine Learning", DEMO_STUDENT_ID,
                "Custom", "", "Medium", "2025-09-19",
                "Vectorized cost calculation and derivative weight update loops.",
                new ProblemSolution("Python",
                        "import numpy as np\n\ndef compute_gradient(x, y, w, b):\n    m = x.shape[0]\n    f_wb = w * x + b\n    dj_dw = (1 / m) * np.sum((f_wb - y) * x)\n    dj_db = (1 / m) * np.sum(f_wb - y)\n    return dj_dw, dj_db\n\ndef gradient_descent(x, y, w_init, b_init, alpha, num_iters):\n    w, b = w_init, b_init\n    for i in range(num_iters):\n        dj_dw, dj_db = compute_gradient(x, y, w, b)\n        w -= alpha * dj_dw\n        b -= alpha * dj_db\n    return w, b",
                        "Verifying learning rate convergence manually builds deep intuition.")
        ));

        studentProblemsMap.put(DEMO_STUDENT_ID, problems);
    }

    public List<PracticeProblem> getProblems(String studentId) {
        return studentProblemsMap.computeIfAbsent(studentId, k -> new ArrayList<>());
    }

    public List<PracticeProblem> getProblemsBySkill(String studentId, String skillId) {
        return getProblems(studentId).stream()
                .filter(p -> p.getSkillId().equalsIgnoreCase(skillId))
                .collect(Collectors.toList());
    }

    public Optional<PracticeProblem> getProblemById(String studentId, String problemId) {
        return getProblems(studentId).stream()
                .filter(p -> p.getId().equalsIgnoreCase(problemId))
                .findFirst();
    }

    public PracticeProblem addProblem(String studentId, PracticeProblem problem) {
        if (problem.getTitle() == null || problem.getTitle().trim().isEmpty()) {
            throw new IllegalArgumentException("Problem title is required.");
        }
        if (problem.getSkillId() == null || problem.getSkillId().trim().isEmpty()) {
            throw new IllegalArgumentException("Problem must be associated with a skill.");
        }
        if (problem.getId() == null || problem.getId().trim().isEmpty()) {
            problem.setId("prob_" + UUID.randomUUID().toString().substring(0, 8));
        }
        problem.setStudentId(studentId);
        getProblems(studentId).add(0, problem); // Insert newest at top
        return problem;
    }

    public PracticeProblem updateProblem(String studentId, String problemId, PracticeProblem updated) {
        PracticeProblem existing = getProblemById(studentId, problemId)
                .orElseThrow(() -> new NoSuchElementException("Problem not found with ID: " + problemId));

        if (updated.getTitle() != null && !updated.getTitle().trim().isEmpty()) {
            existing.setTitle(updated.getTitle().trim());
        }
        if (updated.getSkillId() != null) {
            existing.setSkillId(updated.getSkillId());
        }
        if (updated.getSkillName() != null) {
            existing.setSkillName(updated.getSkillName());
        }
        if (updated.getPlatform() != null) {
            existing.setPlatform(updated.getPlatform());
        }
        if (updated.getProblemUrl() != null) {
            existing.setProblemUrl(updated.getProblemUrl());
        }
        if (updated.getDifficulty() != null) {
            existing.setDifficulty(updated.getDifficulty());
        }
        if (updated.getDateSolved() != null) {
            existing.setDateSolved(updated.getDateSolved());
        }
        if (updated.getNotes() != null) {
            existing.setNotes(updated.getNotes());
        }
        if (updated.getSolution() != null) {
            existing.setSolution(updated.getSolution());
        }
        existing.touch();
        return existing;
    }

    public boolean deleteProblem(String studentId, String problemId) {
        List<PracticeProblem> problems = getProblems(studentId);
        return problems.removeIf(p -> p.getId().equalsIgnoreCase(problemId));
    }

    public int countProblemsBySkill(String studentId, String skillId) {
        return (int) getProblems(studentId).stream()
                .filter(p -> p.getSkillId().equalsIgnoreCase(skillId))
                .count();
    }
}
