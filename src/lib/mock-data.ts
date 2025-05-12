
export interface Topic {
  id: string;
  title: string;
  description?: string;
  createdAt: string;
  userId: string;
  questionCount: number;
}

export interface Question {
  id: string;
  title: string;
  difficulty: "Easy" | "Medium" | "Hard";
  sourceUrl: string;
  source: "LeetCode" | "GeeksForGeeks" | "HackerRank" | "CodeForces" | "Other";
  description: string;
  topicId: string;
  createdAt: string;
  userId: string;
  isUnderstood: boolean;
  variations: QuestionVariation[];
}

export interface QuestionVariation {
  id: string;
  title: string;
  description: string;
}

export interface PseudoCodeAttempt {
  id: string;
  questionId: string;
  content: string;
  createdAt: string;
  feedback?: string;
}

// Mock topics
export const mockTopics: Topic[] = [
  {
    id: "1",
    title: "Array Manipulation",
    description: "Problems involving array operations and transformations",
    createdAt: "2023-04-10T10:30:00Z",
    userId: "1",
    questionCount: 3
  },
  {
    id: "2",
    title: "Linked Lists",
    description: "Problems related to linked list data structures",
    createdAt: "2023-04-12T14:45:00Z",
    userId: "1",
    questionCount: 2
  },
  {
    id: "3",
    title: "Dynamic Programming",
    description: "Problems solvable using dynamic programming approach",
    createdAt: "2023-04-15T09:20:00Z",
    userId: "1",
    questionCount: 1
  },
  {
    id: "4",
    title: "Graph Algorithms",
    description: "Problems involving graph traversal and algorithms",
    createdAt: "2023-04-18T16:15:00Z",
    userId: "1",
    questionCount: 0
  }
];

// Mock questions
export const mockQuestions: Record<string, Question[]> = {
  "1": [ // Array Manipulation topic
    {
      id: "101",
      title: "Two Sum",
      difficulty: "Easy",
      sourceUrl: "https://leetcode.com/problems/two-sum/",
      source: "LeetCode",
      description: `
## Problem Description

Given an array of integers **nums** and an integer **target**, return indices of the two numbers such that they add up to **target**.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

### Example 1:
\`\`\`
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].
\`\`\`

### Example 2:
\`\`\`
Input: nums = [3,2,4], target = 6
Output: [1,2]
\`\`\`

### Example 3:
\`\`\`
Input: nums = [3,3], target = 6
Output: [0,1]
\`\`\`

### Constraints:
- 2 <= nums.length <= 10^4
- -10^9 <= nums[i] <= 10^9
- -10^9 <= target <= 10^9
- Only one valid answer exists.
      `,
      topicId: "1",
      createdAt: "2023-04-10T11:30:00Z",
      userId: "1",
      isUnderstood: false,
      variations: [
        {
          id: "v101-1",
          title: "Two Sum with Sorted Array",
          description: "If the array is sorted, how would you modify your approach for better time complexity?"
        },
        {
          id: "v101-2",
          title: "Three Sum",
          description: "Find three numbers in the array that sum to a target value."
        },
        {
          id: "v101-3",
          title: "Two Sum with Multiple Valid Pairs",
          description: "What if there are multiple valid pairs? Return all unique pairs that sum to the target."
        }
      ]
    },
    {
      id: "102",
      title: "Best Time to Buy and Sell Stock",
      difficulty: "Easy",
      sourceUrl: "https://leetcode.com/problems/best-time-to-buy-and-sell-stock/",
      source: "LeetCode",
      description: `
## Problem Description

You are given an array \`prices\` where \`prices[i]\` is the price of a given stock on the i-th day.

You want to maximize your profit by choosing a single day to buy one stock and choosing a different day in the future to sell that stock.

Return the maximum profit you can achieve from this transaction. If you cannot achieve any profit, return 0.

### Example 1:
\`\`\`
Input: prices = [7,1,5,3,6,4]
Output: 5
Explanation: Buy on day 2 (price = 1) and sell on day 5 (price = 6), profit = 6-1 = 5.
Not 7-1 = 6, as selling price needs to be larger than buying price.
\`\`\`

### Example 2:
\`\`\`
Input: prices = [7,6,4,3,1]
Output: 0
Explanation: In this case, no transactions are done and the max profit = 0.
\`\`\`
      `,
      topicId: "1",
      createdAt: "2023-04-11T09:45:00Z",
      userId: "1",
      isUnderstood: true,
      variations: [
        {
          id: "v102-1",
          title: "Multiple Buy and Sell",
          description: "What if you can buy and sell multiple times? Find the maximum profit."
        },
        {
          id: "v102-2",
          title: "Buy and Sell with Cooldown",
          description: "After selling, you need to wait one day before buying again."
        }
      ]
    },
    {
      id: "103",
      title: "Maximum Subarray",
      difficulty: "Medium",
      sourceUrl: "https://leetcode.com/problems/maximum-subarray/",
      source: "LeetCode",
      description: `
## Problem Description

Given an integer array \`nums\`, find the subarray with the largest sum, and return its sum.

### Example 1:
\`\`\`
Input: nums = [-2,1,-3,4,-1,2,1,-5,4]
Output: 6
Explanation: The subarray [4,-1,2,1] has the largest sum 6.
\`\`\`

### Example 2:
\`\`\`
Input: nums = [1]
Output: 1
Explanation: The subarray [1] has the largest sum 1.
\`\`\`

### Example 3:
\`\`\`
Input: nums = [5,4,-1,7,8]
Output: 23
Explanation: The subarray [5,4,-1,7,8] has the largest sum 23.
\`\`\`
      `,
      topicId: "1",
      createdAt: "2023-04-12T14:20:00Z",
      userId: "1",
      isUnderstood: false,
      variations: [
        {
          id: "v103-1",
          title: "Maximum Circular Subarray",
          description: "Find the maximum sum when the subarray can wrap around (circular array)."
        },
        {
          id: "v103-2",
          title: "Maximum Product Subarray",
          description: "Find a subarray with the largest product instead of sum."
        },
        {
          id: "v103-3",
          title: "Maximum Subarray with Size Constraint",
          description: "Find the maximum subarray with a constraint on the size of the subarray."
        }
      ]
    }
  ],
  "2": [ // Linked Lists topic
    {
      id: "201",
      title: "Reverse Linked List",
      difficulty: "Easy",
      sourceUrl: "https://leetcode.com/problems/reverse-linked-list/",
      source: "LeetCode",
      description: `
## Problem Description

Given the \`head\` of a singly linked list, reverse the list, and return the reversed list.

### Example 1:
\`\`\`
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]
\`\`\`

### Example 2:
\`\`\`
Input: head = [1,2]
Output: [2,1]
\`\`\`

### Example 3:
\`\`\`
Input: head = []
Output: []
\`\`\`
      `,
      topicId: "2",
      createdAt: "2023-04-13T10:15:00Z",
      userId: "1",
      isUnderstood: true,
      variations: [
        {
          id: "v201-1",
          title: "Reverse Linked List II",
          description: "Reverse only part of the linked list between positions m and n."
        },
        {
          id: "v201-2",
          title: "Reverse Nodes in k-Group",
          description: "Reverse nodes in k-sized groups throughout the linked list."
        }
      ]
    }
  ],
  "3": [ // Dynamic Programming topic
    {
      id: "301",
      title: "Climbing Stairs",
      difficulty: "Easy",
      sourceUrl: "https://leetcode.com/problems/climbing-stairs/",
      source: "LeetCode",
      description: `
## Problem Description

You are climbing a staircase. It takes \`n\` steps to reach the top.

Each time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?

### Example 1:
\`\`\`
Input: n = 2
Output: 2
Explanation: There are two ways to climb to the top.
1. 1 step + 1 step
2. 2 steps
\`\`\`

### Example 2:
\`\`\`
Input: n = 3
Output: 3
Explanation: There are three ways to climb to the top.
1. 1 step + 1 step + 1 step
2. 1 step + 2 steps
3. 2 steps + 1 step
\`\`\`
      `,
      topicId: "3",
      createdAt: "2023-04-15T11:30:00Z",
      userId: "1",
      isUnderstood: false,
      variations: [
        {
          id: "v301-1",
          title: "Climbing Stairs with Cost",
          description: "Each step has a cost. Find the minimum cost to reach the top."
        },
        {
          id: "v301-2",
          title: "Climbing Stairs with Variable Steps",
          description: "What if you can climb 1, 2, or 3 steps at a time?"
        },
        {
          id: "v301-3",
          title: "Climbing Stairs with Forbidden Steps",
          description: "Some steps are forbidden. Find the number of ways to climb."
        }
      ]
    }
  ]
};

// Mock pseudocode attempts
export const mockPseudocodeAttempts: Record<string, PseudoCodeAttempt[]> = {
  "101": [ // Two Sum attempts
    {
      id: "p101-1",
      questionId: "101",
      content: `function twoSum(nums, target) {
  // Brute force approach
  for i from 0 to nums.length - 1
    for j from i + 1 to nums.length - 1
      if nums[i] + nums[j] == target
        return [i, j]
  
  return [] // No solution
}`,
      createdAt: "2023-04-10T12:30:00Z"
    },
    {
      id: "p101-2",
      questionId: "101",
      content: `function twoSum(nums, target) {
  // Using a hashmap for O(n) time complexity
  let map = new Map()
  
  for i from 0 to nums.length - 1
    let complement = target - nums[i]
    
    if map has key complement
      return [map.get(complement), i]
    
    map.set(nums[i], i)
  
  return [] // No solution
}`,
      createdAt: "2023-04-10T12:45:00Z",
      feedback: "Great improvement using a hashmap approach! This reduces the time complexity from O(n²) to O(n). One small optimization: you could check if the complement exists in the map before adding the current element. This way, you avoid edge cases with the same element used twice."
    }
  ]
};

// Mock AI feedback generator
export async function generateAIFeedback(code: string): Promise<string> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // Basic feedback based on code length
  if (code.length < 50) {
    return "Your solution looks too brief. Consider adding more details and edge case handling.";
  } else if (code.includes("O(n)") || code.includes("hashmap") || code.includes("Map") || code.includes("dictionary")) {
    return "Great use of optimal data structures! Your approach has good time complexity. Consider adding comments explaining your reasoning and any edge cases you're handling.";
  } else if (code.includes("for") && code.includes("for")) {
    return "Your solution works but has O(n²) time complexity. Consider using a hashmap/dictionary to improve efficiency to O(n).";
  }
  
  // Default feedback
  return "Your solution looks reasonable. Consider analyzing its time and space complexity, and check if there are edge cases you need to handle.";
}
