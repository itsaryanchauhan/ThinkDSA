export async function generateGeminiVariation(
  originalDescription: string,
  apiKey: string
): Promise<{ title: string; description: string }> {
  const prompt = `You are a senior coding interview problem designer.

Given the following programming problem:
"${originalDescription}"

Your task:
- Create ONE unique and creative variation of this problem.
- The variation must change the original in a meaningful way (e.g., constraints, input, or output), but remain closely related to the original topic.
- The title must be creative, specific, and highlight the unique twist of the variation. It must NOT repeat or closely resemble the original title, and must NOT be generic (e.g., "Variation", "Linked List Problem", "Another Version").
- The title must be relevant to the new variation and clearly describe the new challenge or constraint.
- The description must be short, clear, and actionable (max 20 words).
- Do NOT repeat the original title or description.

Examples:
Original: "Reverse a Linked List"
Variation Title: "Reverse Linked List in Groups"
Variation Description: "Reverse the linked list in groups of size k."

Original: "Find the Maximum Subarray"
Variation Title: "Maximum Subarray with One Deletion"
Variation Description: "Find the maximum subarray sum, allowing at most one element to be deleted."

Negative Examples (do NOT use these as titles):
- "Variation"
- "Linked List Problem"
- "Another Version"
- "Modified Problem"

Output format:
Return ONLY a valid JSON object in this format:
{
  "title": "A unique, creative, and relevant title (max 8 words)",
  "description": "A short, clear description of the variation (max 20 words)"
}

IMPORTANT:
- Do NOT include any explanation, notes, or extra text.
- Both "title" and "description" fields are REQUIRED and must be non-empty.
- The output must be a single JSON object as shown above.
- Be original and do NOT repeat titles from previous variations.`;

  const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`;

  const body = {
    contents: [
      {
        parts: [{ text: prompt }]
      }
    ],
    generationConfig: {
      temperature: 0.8,
      topK: 40,
      topP: 0.9,
      maxOutputTokens: 200
    }
  };

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    // Check for API errors
    if (data.error) {
      throw new Error(`API error: ${data.error.message}`);
    }

    let text = data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

    if (!text) {
      throw new Error("No text content received from API");
    }

    // Clean up the response
    text = text.replace(/```(?:json)?|```/g, "")
               .replace(/'/g, '"')
               .replace(/,\s*([}\]])/g, "$1")
               .trim();

    // Try multiple JSON extraction patterns
    const jsonPatterns = [
      /\{[\s\S]*?\}/,  // Standard JSON object
      /\{\s*"title"[\s\S]*?"description"[\s\S]*?\}/,  // Flexible JSON structure
      /"title":\s*"[^"]*",?\s*"description":\s*"[^"]*"/  // Key-value pairs
    ];

    for (const pattern of jsonPatterns) {
      const match = text.match(pattern);
      if (match) {
        try {
          let jsonStr = match[0];
          
          // Ensure proper JSON format
          if (!jsonStr.startsWith('{')) {
            jsonStr = '{' + jsonStr + '}';
          }
          
          const parsed = JSON.parse(jsonStr);
          
          if (
            parsed &&
            typeof parsed.title === "string" &&
            typeof parsed.description === "string" &&
            parsed.title.trim().length > 0 &&
            parsed.description.trim().length > 0
          ) {
            return {
              title: parsed.title.trim(),
              description: parsed.description.trim()
            };
          }
        } catch (parseError) {
          // Continue to next pattern
          continue;
        }
      }
    }

    // Fallback: try to extract title and description separately
    const titleMatch = text.match(/"title":\s*"([^"]+)"/);
    const descMatch = text.match(/"description":\s*"([^"]+)"/);
    
    if (titleMatch && descMatch) {
      return {
        title: titleMatch[1].trim(),
        description: descMatch[1].trim()
      };
    }

  } catch (error) {
    console.error("Error generating variation:", error);
  }

  // Final fallback
  return {
    title: "Unique Algorithm Variant",
    description: "Solve the problem with a new constraint."
  };
}