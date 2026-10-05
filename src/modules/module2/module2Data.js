/**
 * Module 2 Demo Data for Rahul (Second Year CSE AI/ML).
 *
 * Implements the Transparent Faculty-Explainable Progress Formula:
 * -------------------------------------------------------------
 * 1. Resource Completion % = (completedResources / totalResources) * 100
 * 2. Practice Problem % = Math.min(100.0, (solvedProblems / targetProblems) * 100)
 * 3. Overall Progress % = (Resource % * 0.50) + (Practice % * 0.50)
 * -------------------------------------------------------------
 */

export const INITIAL_SKILLS = [
  {
    id: 'skill_py',
    name: 'Python',
    category: 'Programming',
    currentLevel: 'Intermediate',
    targetLevel: 'Advanced',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 30,
    lastActivity: 'Today'
  },
  {
    id: 'skill_java',
    name: 'Java',
    category: 'Programming',
    currentLevel: 'Intermediate',
    targetLevel: 'Advanced',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 30,
    lastActivity: 'Yesterday'
  },
  {
    id: 'skill_dsa',
    name: 'DSA',
    category: 'Core CS',
    currentLevel: 'Intermediate',
    targetLevel: 'Advanced',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 35,
    lastActivity: '2 days ago'
  },
  {
    id: 'skill_react',
    name: 'React',
    category: 'Web Development',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 20,
    lastActivity: '3 days ago'
  },
  {
    id: 'skill_ml',
    name: 'Machine Learning',
    category: 'AI / ML',
    currentLevel: 'Beginner',
    targetLevel: 'Intermediate',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 25,
    lastActivity: '4 days ago'
  },
  {
    id: 'skill_sql',
    name: 'SQL',
    category: 'Database',
    currentLevel: 'Intermediate',
    targetLevel: 'Advanced',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 25,
    lastActivity: '5 days ago'
  },
  {
    id: 'skill_html_css',
    name: 'HTML & CSS',
    category: 'Web Development',
    currentLevel: 'Advanced',
    targetLevel: 'Expert',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 15,
    lastActivity: 'Last week'
  },
  {
    id: 'skill_js',
    name: 'JavaScript',
    category: 'Web Development',
    currentLevel: 'Intermediate',
    targetLevel: 'Advanced',
    status: 'Active',
    isCustom: false,
    targetProblemsCount: 25,
    lastActivity: 'Last week'
  }
];

export const INITIAL_RESOURCES = [
  // --- Python Resources (8 total, 6 completed => 75%) ---
  {
    id: 'res_py_1',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Python 3 Complete Masterclass: Syntax & Fundamentals',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=rfscVS0vtbw',
    type: 'Video',
    description: 'Core syntax, data types, loops, and control flow in modern Python.',
    completed: true,
    completedDate: '2025-08-10'
  },
  {
    id: 'res_py_2',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Python Functions, Lambdas & Scope Resolution',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=u-OmVr_fT4s',
    type: 'Video',
    description: 'Function definitions, arbitrary arguments (*args, **kwargs), and closures.',
    completed: true,
    completedDate: '2025-08-15'
  },
  {
    id: 'res_py_3',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Python OOP: Classes, Inheritance & Dunder Methods',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=JeznW_7DlB0',
    type: 'Playlist',
    description: 'Class design, encapsulation, dunder methods, and multiple inheritance.',
    completed: true,
    completedDate: '2025-09-02'
  },
  {
    id: 'res_py_4',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Python File Handling, JSON & Context Managers',
    platform: 'Official Docs',
    url: 'https://docs.python.org/3/tutorial/inputoutput.html',
    type: 'Documentation',
    description: 'Working with files, with-statements, reading/writing JSON datasets.',
    completed: true,
    completedDate: '2025-09-18'
  },
  {
    id: 'res_py_5',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Python Virtual Environments & Pip Package Management',
    platform: 'Tutorial',
    url: 'https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/',
    type: 'Tutorial',
    description: 'Virtual environment isolation, requirements.txt, and dependency resolution.',
    completed: true,
    completedDate: '2025-10-01'
  },
  {
    id: 'res_py_6',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Python NumPy & Vectorized Computations',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/python-data-analysis',
    type: 'Course',
    description: 'N-dimensional arrays, broadcasting, and performance optimizations.',
    completed: true,
    completedDate: '2025-10-15'
  },
  {
    id: 'res_py_7',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Python Multiprocessing & AsyncIO Architecture',
    platform: 'Official Docs',
    url: 'https://docs.python.org/3/library/asyncio.html',
    type: 'Documentation',
    description: 'Event loop, coroutines, async/await, and worker process pools.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_py_8',
    skillId: 'skill_py',
    skillName: 'Python',
    title: 'Building Scalable REST APIs with FastAPI & Pydantic',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=0sOvCWFmrtA',
    type: 'Video',
    description: 'Modern async web frameworks, dependency injection, and schemas.',
    completed: false,
    completedDate: null
  },

  // --- Java Resources (6 total, 4 completed => 66.7%) ---
  {
    id: 'res_java_1',
    skillId: 'skill_java',
    skillName: 'Java',
    title: 'Java 17 Fundamentals & JVM Architecture',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=A74TOX803D0',
    type: 'Video',
    description: 'JVM internals, bytecode execution, heap vs stack memory model.',
    completed: true,
    completedDate: '2025-07-20'
  },
  {
    id: 'res_java_2',
    skillId: 'skill_java',
    skillName: 'Java',
    title: 'Java OOP Deep Dive: Classes, Encapsulation & Inheritance',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=xk4_1vDrzzo',
    type: 'Playlist',
    description: 'Object modeling, abstract classes, interface contracts, polymorphism.',
    completed: true,
    completedDate: '2025-08-05'
  },
  {
    id: 'res_java_3',
    skillId: 'skill_java',
    skillName: 'Java',
    title: 'Java Collections Framework: Lists, Sets & Maps',
    platform: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/collections-in-java-2/',
    type: 'Article',
    description: 'ArrayList vs LinkedList, HashMap collisions, TreeSet comparators.',
    completed: true,
    completedDate: '2025-09-10'
  },
  {
    id: 'res_java_4',
    skillId: 'skill_java',
    skillName: 'Java',
    title: 'Java Generics & Type Erasure',
    platform: 'Official Docs',
    url: 'https://docs.oracle.com/javase/tutorial/java/generics/',
    type: 'Documentation',
    description: 'Generic classes, bounded wildcards (? extends T), compiler erasure.',
    completed: true,
    completedDate: '2025-09-28'
  },
  {
    id: 'res_java_5',
    skillId: 'skill_java',
    skillName: 'Java',
    title: 'Java Streams, Lambdas & Functional Interfaces',
    platform: 'Udemy',
    url: 'https://www.udemy.com/course/java-stream-api/',
    type: 'Course',
    description: 'Declarative data pipelines, map-filter-reduce, parallel streams.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_java_6',
    skillId: 'skill_java',
    skillName: 'Java',
    title: 'Java Multithreading, Concurrency & Thread Pools',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=r_MbozD32eo',
    type: 'Video',
    description: 'ExecutorService, volatile, synchronized blocks, atomic variables.',
    completed: false,
    completedDate: null
  },

  // --- DSA Resources (6 total, 3 completed => 50%) ---
  {
    id: 'res_dsa_1',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    title: 'Asymptotic Notation & Time-Space Complexity Analysis',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=9TlHvipP5yA',
    type: 'Video',
    description: 'Big-O, Big-Omega, recurrence relations, Master Theorem.',
    completed: true,
    completedDate: '2025-08-12'
  },
  {
    id: 'res_dsa_2',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    title: 'Arrays, Two Pointers & Sliding Window Patterns',
    platform: 'LeetCode',
    url: 'https://leetcode.com/explore/featured/card/leetcodes-interview-crash-course-data-structures-and-algorithms/',
    type: 'Course',
    description: 'Fast & slow pointers, prefix sums, contiguous subarrays.',
    completed: true,
    completedDate: '2025-09-01'
  },
  {
    id: 'res_dsa_3',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    title: 'Recursion & Backtracking Blueprint',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=wZnWmy0tqZ4',
    type: 'Playlist',
    description: 'Recursive call stacks, base conditions, state restoration.',
    completed: true,
    completedDate: '2025-09-22'
  },
  {
    id: 'res_dsa_4',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    title: 'Trees & Binary Search Trees (BST) Traversals',
    platform: 'GeeksforGeeks',
    url: 'https://www.geeksforgeeks.org/binary-tree-data-structure/',
    type: 'Article',
    description: 'Inorder, Preorder, Postorder, BFS Level-Order, Diameter.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_dsa_5',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    title: 'Graph Algorithms: BFS, DFS, Dijkstra & Topological Sort',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=tWVWeAqZ0WU',
    type: 'Playlist',
    description: 'Adjacency lists, shortest paths, DAG cycle detection.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_dsa_6',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    title: 'Dynamic Programming: 1D & 2D Memoization to Tabulation',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=oBt53YbR9Kk',
    type: 'Video',
    description: 'Subproblem overlapping, optimal substructure, knapsack patterns.',
    completed: false,
    completedDate: null
  },

  // --- React Resources (5 total, 2 completed => 40%) ---
  {
    id: 'res_react_1',
    skillId: 'skill_react',
    skillName: 'React',
    title: 'React 18 Crash Course: JSX, Components & Props',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=bMknfKXIFA8',
    type: 'Video',
    description: 'Component tree hierarchy, virtual DOM reconciliation, prop drilling.',
    completed: true,
    completedDate: '2025-09-14'
  },
  {
    id: 'res_react_2',
    skillId: 'skill_react',
    skillName: 'React',
    title: 'React Hooks: useState, useEffect & useRef In-Depth',
    platform: 'Official Docs',
    url: 'https://react.dev/reference/react',
    type: 'Documentation',
    description: 'Lifecycle management, side-effects synchronization, ref persistence.',
    completed: true,
    completedDate: '2025-10-04'
  },
  {
    id: 'res_react_3',
    skillId: 'skill_react',
    skillName: 'React',
    title: 'State Management with Context API & Custom Hooks',
    platform: 'Article',
    url: 'https://kentcdodds.com/blog/how-to-use-react-context-effectively',
    type: 'Article',
    description: 'Global state without Redux boilerplate, custom reusable hook encapsulation.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_react_4',
    skillId: 'skill_react',
    skillName: 'React',
    title: 'Client-Side Routing with React Router v6',
    platform: 'Tutorial',
    url: 'https://reactrouter.com/en/main/start/tutorial',
    type: 'Tutorial',
    description: 'Dynamic route params, nested routes, route loaders.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_react_5',
    skillId: 'skill_react',
    skillName: 'React',
    title: 'React Performance Optimization: useMemo, useCallback & Profiler',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=DEPwA3mv_R8',
    type: 'Video',
    description: 'Preventing wasteful re-renders, React.memo, DevTools profiling.',
    completed: false,
    completedDate: null
  },

  // --- Machine Learning Resources (5 total, 2 completed => 40%) ---
  {
    id: 'res_ml_1',
    skillId: 'skill_ml',
    skillName: 'Machine Learning',
    title: 'Supervised Learning: Linear & Logistic Regression',
    platform: 'Coursera',
    url: 'https://www.coursera.org/learn/machine-learning',
    type: 'Course',
    description: 'Cost functions, gradient descent optimization, binary classification.',
    completed: true,
    completedDate: '2025-08-20'
  },
  {
    id: 'res_ml_2',
    skillId: 'skill_ml',
    skillName: 'Machine Learning',
    title: 'Scikit-Learn Pipeline & Feature Engineering',
    platform: 'Official Docs',
    url: 'https://scikit-learn.org/stable/modules/compose.html',
    type: 'Documentation',
    description: 'StandardScaler, OneHotEncoder, ColumnTransformer, Pipeline chaining.',
    completed: true,
    completedDate: '2025-09-15'
  },
  {
    id: 'res_ml_3',
    skillId: 'skill_ml',
    skillName: 'Machine Learning',
    title: 'Decision Trees, Random Forests & Ensemble Boosting',
    platform: 'YouTube',
    url: 'https://www.youtube.com/watch?v=J4Wdy0Wc_xQ',
    type: 'Video',
    description: 'Gini impurity, information gain, bagging vs boosting, XGBoost.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_ml_4',
    skillId: 'skill_ml',
    skillName: 'Machine Learning',
    title: 'Unsupervised Learning: K-Means & PCA Dimensionality Reduction',
    platform: 'Article',
    url: 'https://towardsdatascience.com/pca-using-python-scikit-learn-e653f8989e60',
    type: 'Article',
    description: 'Clustering centroids, elbow method, eigenvector projections.',
    completed: false,
    completedDate: null
  },
  {
    id: 'res_ml_5',
    skillId: 'skill_ml',
    skillName: 'Machine Learning',
    title: 'Model Evaluation Metrics: Precision, Recall, F1 & ROC-AUC',
    platform: 'Tutorial',
    url: 'https://developers.google.com/machine-learning/crash-course/classification/precision-and-recall',
    type: 'Tutorial',
    description: 'Confusion matrix, tradeoff thresholds, classification reports.',
    completed: false,
    completedDate: null
  }
];

export const INITIAL_PROBLEMS = [
  {
    id: 'prob_1',
    title: 'Two Sum',
    skillId: 'skill_py',
    skillName: 'Python',
    platform: 'LeetCode',
    problemUrl: 'https://leetcode.com/problems/two-sum/',
    difficulty: 'Easy',
    dateSolved: '2025-09-05',
    notes: 'Solved using hash map for O(n) single-pass lookup instead of brute-force O(n^2).',
    solution: {
      language: 'Python',
      code: `class Solution:
    def twoSum(self, nums: list[int], target: int) -> list[int]:
        prev_map = {}  # val -> index
        for i, n in enumerate(nums):
            diff = target - n
            if diff in prev_map:
                return [prev_map[diff], i]
            prev_map[n] = i
        return []`,
      notes: 'Key takeaway: Trading space O(n) for time O(n) using a hash map.'
    }
  },
  {
    id: 'prob_2',
    title: 'Valid Parentheses',
    skillId: 'skill_py',
    skillName: 'Python',
    platform: 'LeetCode',
    problemUrl: 'https://leetcode.com/problems/valid-parentheses/',
    difficulty: 'Easy',
    dateSolved: '2025-09-12',
    notes: 'Stack data structure where closing brackets must match top opening bracket.',
    solution: {
      language: 'Python',
      code: `class Solution:
    def isValid(self, s: str) -> bool:
        stack = []
        close_to_open = {')': '(', ']': '[', '}': '{'}
        for c in s:
            if c in close_to_open:
                if stack and stack[-1] == close_to_open[c]:
                    stack.pop()
                else:
                    return False
            else:
                stack.append(c)
        return True if not stack else False`,
      notes: 'Ensure stack is empty at the end to guarantee every bracket was matched.'
    }
  },
  {
    id: 'prob_3',
    title: 'Reverse String In-Place',
    skillId: 'skill_py',
    skillName: 'Python',
    platform: 'LeetCode',
    problemUrl: 'https://leetcode.com/problems/reverse-string/',
    difficulty: 'Easy',
    dateSolved: '2025-09-18',
    notes: 'Two pointers left and right swapping until left >= right.',
    solution: {
      language: 'Python',
      code: `class Solution:
    def reverseString(self, s: list[str]) -> None:
        left, right = 0, len(s) - 1
        while left < right:
            s[left], s[right] = s[right], s[left]
            left += 1
            right -= 1`,
      notes: 'O(1) memory complexity, O(n) time.'
    }
  },
  {
    id: 'prob_4',
    title: 'Binary Search',
    skillId: 'skill_java',
    skillName: 'Java',
    platform: 'LeetCode',
    problemUrl: 'https://leetcode.com/problems/binary-search/',
    difficulty: 'Easy',
    dateSolved: '2025-09-22',
    notes: 'Classic iterative binary search with overflow prevention in midpoint calculation.',
    solution: {
      language: 'Java',
      code: `class Solution {
    public int search(int[] nums, int target) {
        int left = 0, right = nums.length - 1;
        while (left <= right) {
            int mid = left + (right - left) / 2;
            if (nums[mid] == target) return mid;
            else if (nums[mid] < target) left = mid + 1;
            else right = mid - 1;
        }
        return -1;
    }
}`,
      notes: 'Always use left + (right - left) / 2 to avoid integer overflow.'
    }
  },
  {
    id: 'prob_5',
    title: 'Palindrome Number',
    skillId: 'skill_java',
    skillName: 'Java',
    platform: 'LeetCode',
    problemUrl: 'https://leetcode.com/problems/palindrome-number/',
    difficulty: 'Easy',
    dateSolved: '2025-09-25',
    notes: 'Revert half of the integer digits mathematically without string conversion.',
    solution: {
      language: 'Java',
      code: `class Solution {
    public boolean isPalindrome(int x) {
        if (x < 0 || (x % 10 == 0 && x != 0)) return false;
        int revertedNumber = 0;
        while (x > revertedNumber) {
            revertedNumber = revertedNumber * 10 + x % 10;
            x /= 10;
        }
        return x == revertedNumber || x == revertedNumber / 10;
    }
}`,
      notes: 'Halving the digits avoids 32-bit overflow entirely.'
    }
  },
  {
    id: 'prob_6',
    title: 'Rotate Array',
    skillId: 'skill_java',
    skillName: 'Java',
    platform: 'GeeksforGeeks',
    problemUrl: 'https://practice.geeksforgeeks.org/problems/rotate-array-by-n-elements/',
    difficulty: 'Medium',
    dateSolved: '2025-10-02',
    notes: 'Reversal algorithm: reverse whole array, reverse first k, reverse remaining.',
    solution: {
      language: 'Java',
      code: `class Solution {
    public void rotate(int[] nums, int k) {
        k %= nums.length;
        reverse(nums, 0, nums.length - 1);
        reverse(nums, 0, k - 1);
        reverse(nums, k, nums.length - 1);
    }
    private void reverse(int[] nums, int start, int end) {
        while (start < end) {
            int temp = nums[start];
            nums[start++] = nums[end];
            nums[end--] = temp;
        }
    }
}`,
      notes: 'Triple reversal is clean O(1) space.'
    }
  },
  {
    id: 'prob_7',
    title: 'Top K Frequent Elements',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    platform: 'LeetCode',
    problemUrl: 'https://leetcode.com/problems/top-k-frequent-elements/',
    difficulty: 'Medium',
    dateSolved: '2025-09-28',
    notes: 'Bucket sort approach to achieve O(n) linear time instead of heap O(n log k).',
    solution: {
      language: 'Java',
      code: `import java.util.*;

class Solution {
    public int[] topKFrequent(int[] nums, int k) {
        Map<Integer, Integer> count = new HashMap<>();
        for (int n : nums) count.put(n, count.getOrDefault(n, 0) + 1);
        List<Integer>[] bucket = new List[nums.length + 1];
        for (int key : count.keySet()) {
            int freq = count.get(key);
            if (bucket[freq] == null) bucket[freq] = new ArrayList<>();
            bucket[freq].add(key);
        }
        int[] res = new int[k];
        int idx = 0;
        for (int i = bucket.length - 1; i >= 0 && idx < k; i--) {
            if (bucket[i] != null) {
                for (int num : bucket[i]) {
                    res[idx++] = num;
                    if (idx == k) break;
                }
            }
        }
        return res;
    }
}`,
      notes: 'Bucket index represents frequency count.'
    }
  },
  {
    id: 'prob_8',
    title: 'Longest Substring Without Repeating Characters',
    skillId: 'skill_dsa',
    skillName: 'DSA',
    platform: 'LeetCode',
    problemUrl: 'https://leetcode.com/problems/longest-substring-without-repeating-characters/',
    difficulty: 'Medium',
    dateSolved: '2025-10-03',
    notes: 'Sliding window with Set to maintain unique characters within [left, right].',
    solution: {
      language: 'Python',
      code: `class Solution:
    def lengthOfLongestSubstring(self, s: str) -> int:
        char_set = set()
        l = 0
        res = 0
        for r in range(len(s)):
            while s[r] in char_set:
                char_set.remove(s[l])
                l += 1
            char_set.add(s[r])
            res = max(res, r - l + 1)
        return res`,
      notes: 'Sliding window scales gracefully in O(n) time.'
    }
  },
  {
    id: 'prob_9',
    title: 'Gradient Descent for Univariate Linear Regression',
    skillId: 'skill_ml',
    skillName: 'Machine Learning',
    platform: 'Custom',
    problemUrl: '',
    difficulty: 'Medium',
    dateSolved: '2025-09-19',
    notes: 'Vectorized cost calculation and derivative weight update loops.',
    solution: {
      language: 'Python',
      code: `import numpy as np

def compute_gradient(x, y, w, b):
    m = x.shape[0]
    f_wb = w * x + b
    dj_dw = (1 / m) * np.sum((f_wb - y) * x)
    dj_db = (1 / m) * np.sum(f_wb - y)
    return dj_dw, dj_db

def gradient_descent(x, y, w_init, b_init, alpha, num_iters):
    w, b = w_init, b_init
    for i in range(num_iters):
        dj_dw, dj_db = compute_gradient(x, y, w, b)
        w -= alpha * dj_dw
        b -= alpha * dj_db
    return w, b`,
      notes: 'Verifying learning rate convergence manually builds deep intuition.'
    }
  }
];

export const AVAILABLE_STANDARD_SKILLS = [
  'Python',
  'Java',
  'C',
  'C++',
  'HTML & CSS',
  'JavaScript',
  'TypeScript',
  'React',
  'Node.js',
  'Express.js',
  'Spring Boot',
  'SQL',
  'PostgreSQL',
  'MongoDB',
  'Git & GitHub',
  'DSA',
  'Machine Learning',
  'Data Science',
  'Deep Learning',
  'TensorFlow',
  'PyTorch',
  'Java OOP',
  'Computer Networks',
  'Operating Systems',
  'Docker',
  'Kubernetes',
  'AWS',
  'Linux'
];
