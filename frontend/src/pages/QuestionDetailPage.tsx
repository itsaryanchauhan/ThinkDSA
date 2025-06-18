import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import {
  CheckCircle,
  AlertCircle,
  ExternalLink,
  Save,
  ArrowLeft,
  Circle,
  PlayCircle,
  Sparkles,
  ArrowUp,
  MessageSquare,
  Trash2,
  Code,
  Clock,
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import {
  mockQuestions,
  mockTopics,
  generateAIFeedback,
  type Question,
  type Topic,
  mockPseudocodeAttempts,
  type PseudoCodeAttempt,
} from "@/lib/mock-data";
import ReactMarkdown from "react-markdown";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface Solution {
  id: string;
  questionId: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
  upvotes: number;
  isApproved: boolean;
  language?: string;
  title?: string;
  comments?: Comment[];
}

interface Comment {
  id: string;
  userId: string;
  username: string;
  content: string;
  createdAt: string;
}

const QuestionDetailPage = () => {
  // Check for API key and redirect if missing
  useEffect(() => {
    if (!localStorage.getItem("geminiApiKey")) {
      window.location.href = "/";
    }
  }, []);

  const { topicId, questionId } = useParams<{
    topicId: string;
    questionId: string;
  }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [pseudocode, setPseudocode] = useState("");
  const [attempts, setAttempts] = useState<PseudoCodeAttempt[]>([]);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const [solutions, setSolutions] = useState<Solution[]>([]);
  const [newSolution, setNewSolution] = useState("");
  const [solutionTitle, setSolutionTitle] = useState("");
  const [solutionLanguage, setSolutionLanguage] = useState("javascript");
  const [isSubmittingSolution, setIsSubmittingSolution] = useState(false);
  const [commentInputs, setCommentInputs] = useState<Record<string, string>>({});
  const [solutionToDelete, setSolutionToDelete] = useState<string | null>(null);
  const [commentToDelete, setCommentToDelete] = useState<{
    solutionId: string;
    commentId: string;
  } | null>(null);
  const navigate = useNavigate();

  // Load data when topicId or questionId changes
  useEffect(() => {
    if (!topicId || !questionId) return;

    // Get topic data
    const foundTopic = mockTopics.find((t) => t.id === topicId) || null;
    setTopic(foundTopic);

    if (foundTopic) {
      // Get question data
      const topicQuestions = mockQuestions[topicId] || [];
      const foundQuestion = topicQuestions.find((q) => q.id === questionId) || null;
      setQuestion(foundQuestion);

      if (foundQuestion) {
        // Get existing pseudocode attempts
        const questionAttempts = mockPseudocodeAttempts[questionId] || [];
        setAttempts(questionAttempts);

        // Set most recent attempt in editor
        if (questionAttempts.length > 0) {
          setPseudocode(questionAttempts[0].content);
        }
      }
    }

    // Load mock solutions
    const mockSolutions: Solution[] = [
      {
        id: "sol1",
        questionId: questionId,
        userId: "user1",
        username: "CodeMaster42",
        content: "Here's my O(n) solution using a hash map:\n\n```javascript\nfunction twoSum(nums, target) {\n  const map = new Map();\n  for (let i = 0; i < nums.length; i++) {\n    const complement = target - nums[i];\n    if (map.has(complement)) {\n      return [map.get(complement), i];\n    }\n    map.set(nums[i], i);\n  }\n  return [];\n}\n```",
        createdAt: new Date(Date.now() - 3600000).toISOString(),
        upvotes: 8,
        isApproved: true,
        language: "JavaScript",
        title: "Hash Map Solution",
        comments: [
          {
            id: "com1",
            userId: "user2",
            username: "AlgoExpert",
            content: "Nice approach! Have you considered the edge case where the array contains duplicates?",
            createdAt: new Date(Date.now() - 1800000).toISOString(),
          },
        ],
      },
      {
        id: "sol2",
        questionId: questionId,
        userId: "user3",
        username: "BinarySearcher",
        content: "Alternative brute force solution:\n\n```python\ndef twoSum(nums, target):\n    for i in range(len(nums)):\n        for j in range(i + 1, len(nums)):\n            if nums[i] + nums[j] == target:\n                return [i, j]\n    return []\n```\n\nNot the most efficient but straightforward to understand.",
        createdAt: new Date(Date.now() - 7200000).toISOString(),
        upvotes: 3,
        isApproved: true,
        language: "Python",
        title: "Brute Force Approach",
      },
    ];
    setSolutions(mockSolutions);
  }, [topicId, questionId]);

  const handleSavePseudocode = () => {
    if (!pseudocode.trim()) {
      toast.error("Please enter some pseudocode");
      return;
    }

    const newAttempt: PseudoCodeAttempt = {
      id: `p${questionId}-${Date.now()}`,
      questionId: questionId!,
      content: pseudocode,
      createdAt: new Date().toISOString(),
    };

    setAttempts([newAttempt, ...attempts]);
    toast.success("Pseudocode saved successfully");
  };

  const handleGenerateFeedback = async () => {
    if (!pseudocode.trim()) {
      toast.error("Please enter some pseudocode before generating feedback");
      return;
    }

    setIsGeneratingFeedback(true);
    setFeedback("");

    try {
      const generatedFeedback = await generateAIFeedback(pseudocode);
      setFeedback(generatedFeedback);

      const newAttempt: PseudoCodeAttempt = {
        id: `p${questionId}-${Date.now()}`,
        questionId: questionId!,
        content: pseudocode,
        createdAt: new Date().toISOString(),
        feedback: generatedFeedback,
      };

      setAttempts([newAttempt, ...attempts]);
    } catch (error) {
      toast.error("Failed to generate feedback");
      console.error("Feedback generation error:", error);
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const handleToggleUnderstood = () => {
    if (!question) return;

    const updatedQuestion = {
      ...question,
      isUnderstood: !question.isUnderstood,
    };

    setQuestion(updatedQuestion);
    toast.success(
      updatedQuestion.isUnderstood
        ? "Question marked as understood!"
        : "Question marked as needs review"
    );
  };

  const handleSubmitSolution = async () => {
    if (!solutionTitle.trim()) {
      toast.error("Please enter a title for your solution");
      return;
    }

    if (!newSolution.trim()) {
      toast.error("Please enter your solution");
      return;
    }

    if (newSolution.trim().length < 20) {
      toast.error("Solution should be at least 20 characters long");
      return;
    }

    if (newSolution.trim().length > 5000) {
      toast.error("Solution should be less than 5000 characters");
      return;
    }

    // Auto-format code blocks if not already formatted
    let formattedSolution = newSolution;
    if (newSolution.includes('\n') && !newSolution.includes('```')) {
      formattedSolution = `Here's my solution:\n\n\`\`\`${solutionLanguage}\n${newSolution}\n\`\`\``;
    }

    setIsSubmittingSolution(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const solution: Solution = {
        id: `sol-${Date.now()}`,
        questionId: questionId!,
        userId: "current-user",
        username: "You",
        content: formattedSolution,
        createdAt: new Date().toISOString(),
        upvotes: 0,
        isApproved: false,
        language: solutionLanguage,
        title: solutionTitle,
      };

      setSolutions([solution, ...solutions]);
      setNewSolution("");
      setSolutionTitle("");
      toast.success("Solution submitted successfully!");
    } catch (error) {
      toast.error("Failed to submit solution. Please try again.");
      console.error("Solution submission error:", error);
    } finally {
      setIsSubmittingSolution(false);
    }
  };

  const handleUpvote = (solutionId: string) => {
    setSolutions(
      solutions.map((sol) =>
        sol.id === solutionId ? { ...sol, upvotes: sol.upvotes + 1 } : sol
      )
    );
    toast.success("Upvoted solution!");
  };

  const handleAddComment = (solutionId: string) => {
    const commentContent = commentInputs[solutionId];
    if (!commentContent?.trim()) {
      toast.error("Please enter a comment");
      return;
    }

    const newComment: Comment = {
      id: `com-${Date.now()}`,
      userId: "current-user",
      username: "You",
      content: commentContent,
      createdAt: new Date().toISOString(),
    };

    setSolutions(
      solutions.map((sol) =>
        sol.id === solutionId
          ? {
              ...sol,
              comments: [...(sol.comments || []), newComment],
            }
          : sol
      )
    );

    setCommentInputs({ ...commentInputs, [solutionId]: "" });
    toast.success("Comment added!");
  };

  const handleDeleteSolution = (solutionId: string) => {
    setSolutionToDelete(solutionId);
  };

  const handleDeleteComment = (solutionId: string, commentId: string) => {
    setCommentToDelete({ solutionId, commentId });
  };

  const confirmDeleteSolution = () => {
    if (!solutionToDelete) return;
    
    setSolutions(solutions.filter((sol) => sol.id !== solutionToDelete));
    setSolutionToDelete(null);
    toast.success("Solution deleted successfully");
  };

  const confirmDeleteComment = () => {
    if (!commentToDelete) return;
    
    const { solutionId, commentId } = commentToDelete;
    setSolutions(
      solutions.map((sol) =>
        sol.id === solutionId
          ? {
              ...sol,
              comments: sol.comments?.filter((com) => com.id !== commentId) || [],
            }
          : sol
      )
    );
    setCommentToDelete(null);
    toast.success("Comment deleted successfully");
  };

  const renderMarkdown = (content: string) => (
    <ReactMarkdown 
      components={{
        code({node, inline, className, children, ...props}) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline ? (
            <div className="bg-gray-100 dark:bg-gray-800 rounded-md p-4 my-2 overflow-x-auto">
              <div className="flex justify-between items-center mb-2 text-sm text-gray-500 dark:text-gray-400">
                {match ? match[1] : 'Code'}
              </div>
              <code className={className} {...props}>
                {children}
              </code>
            </div>
          ) : (
            <code className="bg-gray-100 dark:bg-gray-800 rounded px-1 py-0.5 text-sm" {...props}>
              {children}
            </code>
          );
        }
      }}
    >
      {content}
    </ReactMarkdown>
  );

  if (!localStorage.getItem("geminiApiKey")) {
    return null;
  }

  if (!topic || !question) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center items-center h-64">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>
              The question you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="relative">
        {/* Top bar with navigation and actions */}
        <div className="sticky top-0 z-10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80 border-b pb-4">
          <div className="flex items-center gap-2 mb-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/topic/${topicId}`)}
              className="text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4 mr-1" /> Back to Topic
            </Button>
            <span className="text-muted-foreground">|</span>
            <span className="font-medium truncate">{question.title}</span>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold truncate max-w-[400px]">
                {question.title}
              </h1>
              <div className="flex gap-2">
                <Badge
                  variant={
                    question.difficulty === "Easy"
                      ? "outline"
                      : question.difficulty === "Medium"
                      ? "secondary"
                      : "destructive"
                  }
                >
                  {question.difficulty}
                </Badge>
                <Badge variant="outline">{question.source}</Badge>
                <Badge
                  variant={question.isUnderstood ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={handleToggleUnderstood}
                >
                  {question.isUnderstood ? (
                    <>
                      <CheckCircle className="h-3.5 w-3.5 mr-1" /> Understood
                    </>
                  ) : (
                    <>
                      <Circle className="h-3.5 w-3.5 mr-1" /> Not Marked
                    </>
                  )}
                </Badge>
              </div>
            </div>
            <Button variant="outline" asChild>
              <a
                href={question.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                Open Original
              </a>
            </Button>
          </div>
        </div>

        {/* Main content area */}
        <div className="h-[calc(100vh-12rem)] mt-6 split-view">
          {/* Left pane - Problem description */}
          <Card className="h-full overflow-hidden flex flex-col shadow-sm border-slate-200 dark:border-slate-800">
            <CardHeader className="bg-card border-b">
              <CardTitle className="flex justify-between items-center">
                Problem Description
                {question.variations.length > 0 && (
                  <Badge variant="outline">
                    {question.variations.length} Variations
                  </Badge>
                )}
              </CardTitle>
              <CardDescription>
                Read carefully and understand the problem requirements
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 overflow-y-auto p-6">
              <Tabs defaultValue="original">
                <TabsList className="mb-4">
                  <TabsTrigger value="original">Original</TabsTrigger>
                  {question.variations.map((variation, idx) => (
                    <TabsTrigger key={variation.id} value={`var-${idx}`}>
                      Variation {idx + 1}
                    </TabsTrigger>
                  ))}
                  <TabsTrigger value="solutions">
                    Community Solutions ({solutions.length})
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="original" className="m-0">
                  <div
                    className="problem-description"
                    dangerouslySetInnerHTML={{ __html: question.description }}
                  />
                </TabsContent>
                {question.variations.map((variation, idx) => (
                  <TabsContent
                    key={variation.id}
                    value={`var-${idx}`}
                    className="m-0"
                  >
                    <h3 className="text-xl font-semibold mb-2">
                      {variation.title}
                    </h3>
                    <p className="mb-4">{variation.description}</p>
                    <p className="text-muted-foreground text-sm mt-4">
                      Think about how you would modify your solution to handle
                      this variation.
                    </p>
                  </TabsContent>
                ))}
                <TabsContent value="solutions" className="m-0">
                  <div className="space-y-6">
                    {/* Enhanced Solution submission form */}
                    <Card>
                      <CardHeader>
                        <CardTitle>Share Your Approach</CardTitle>
                        <CardDescription>
                          Help others learn by sharing your solution or thought process
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <label htmlFor="solution-title" className="block text-sm font-medium">
                                Solution Title
                              </label>
                              <Input
                                id="solution-title"
                                placeholder="Brief description of your approach"
                                value={solutionTitle}
                                onChange={(e) => setSolutionTitle(e.target.value)}
                              />
                            </div>
                            <div className="space-y-2">
                              <label htmlFor="language" className="block text-sm font-medium">
                                Language
                              </label>
                              <Select 
                                value={solutionLanguage} 
                                onValueChange={setSolutionLanguage}
                              >
                                <SelectTrigger>
                                  <SelectValue placeholder="Select language" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="javascript">JavaScript</SelectItem>
                                  <SelectItem value="python">Python</SelectItem>
                                  <SelectItem value="java">Java</SelectItem>
                                  <SelectItem value="c++">C++</SelectItem>
                                  <SelectItem value="typescript">TypeScript</SelectItem>
                                  <SelectItem value="go">Go</SelectItem>
                                  <SelectItem value="rust">Rust</SelectItem>
                                  <SelectItem value="other">Other</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>

                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <label htmlFor="solution-content" className="block text-sm font-medium">
                                Solution Content
                              </label>
                              <span className="text-xs text-muted-foreground">
                                {newSolution.length}/5000 characters
                              </span>
                            </div>
                            <Textarea
                              id="solution-content"
                              className="min-h-[200px] font-mono"
                              placeholder={`Describe your approach and provide your solution...\n\nFor code blocks, use:\n\`\`\`${solutionLanguage}\n// your code here\n\`\`\`\n\nOr simply paste your code - we'll format it for you!`}
                              value={newSolution}
                              onChange={(e) => setNewSolution(e.target.value)}
                            />
                          </div>

                          <div className="flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              Markdown formatting is supported
                            </div>
                            <Button 
                              onClick={handleSubmitSolution}
                              disabled={isSubmittingSolution || !newSolution.trim() || !solutionTitle.trim()}
                            >
                              {isSubmittingSolution ? (
                                <>
                                  <Circle className="h-4 w-4 mr-2 animate-spin" />
                                  Submitting...
                                </>
                              ) : (
                                "Submit Solution"
                              )}
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Enhanced Solutions list */}
                    {solutions.length > 0 ? (
                      solutions.map((solution) => (
                        <Card key={solution.id} className="relative">
                          <div className="absolute top-4 right-4 flex items-center gap-2">
                            {solution.userId === "current-user" && (
                              <Tooltip>
                                <TooltipTrigger asChild>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => handleDeleteSolution(solution.id)}
                                    className="text-red-500 hover:text-red-700"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </Button>
                                </TooltipTrigger>
                                <TooltipContent>Delete solution</TooltipContent>
                              </Tooltip>
                            )}
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleUpvote(solution.id)}
                                >
                                  <ArrowUp className="h-4 w-4 mr-1" />
                                  {solution.upvotes}
                                </Button>
                              </TooltipTrigger>
                              <TooltipContent>Upvote this solution</TooltipContent>
                            </Tooltip>
                          </div>
                          <CardHeader>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={`https://i.pravatar.cc/150?u=${solution.userId}`} />
                                <AvatarFallback>{solution.username.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <CardTitle className="text-base">
                                  {solution.username}
                                  {solution.title && (
                                    <span className="ml-2 text-sm font-normal text-muted-foreground">
                                      {solution.title}
                                    </span>
                                  )}
                                </CardTitle>
                                <CardDescription className="text-xs flex items-center gap-2">
                                  <span>
                                    {new Date(solution.createdAt).toLocaleString()}
                                  </span>
                                  {solution.language && (
                                    <span className="flex items-center gap-1 px-2 py-0.5 bg-muted rounded-full text-xs">
                                      <Code className="h-3 w-3" />
                                      {solution.language}
                                    </span>
                                  )}
                                </CardDescription>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <div className="prose prose-sm dark:prose-invert max-w-none">
                              {renderMarkdown(solution.content)}
                            </div>

                            {/* Enhanced Comments section */}
                            <div className="mt-6 border-t pt-4">
                              <h3 className="text-sm font-medium mb-3 flex items-center gap-2">
                                <MessageSquare className="h-4 w-4" />
                                Discussion ({solution.comments?.length || 0})
                              </h3>
                              
                              {/* Existing comments */}
                              {solution.comments?.map((comment) => (
                                <div key={comment.id} className="flex gap-3 mb-4 group">
                                  <Avatar className="h-6 w-6 mt-1">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${comment.userId}`} />
                                    <AvatarFallback>{comment.username.charAt(0)}</AvatarFallback>
                                  </Avatar>
                                  <div className="flex-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-medium">
                                        {comment.username}
                                      </span>
                                      <span className="text-xs text-muted-foreground flex items-center gap-1">
                                        <Clock className="h-3 w-3" />
                                        {new Date(comment.createdAt).toLocaleTimeString()}
                                      </span>
                                      {comment.userId === "current-user" && (
                                        <Tooltip>
                                          <TooltipTrigger asChild>
                                            <Button
                                              variant="ghost"
                                              size="sm"
                                              className="opacity-0 group-hover:opacity-100 text-red-500 hover:text-red-700 ml-auto"
                                              onClick={() => handleDeleteComment(solution.id, comment.id)}
                                            >
                                              <Trash2 className="h-3.5 w-3.5" />
                                            </Button>
                                          </TooltipTrigger>
                                          <TooltipContent>Delete comment</TooltipContent>
                                        </Tooltip>
                                      )}
                                    </div>
                                    <p className="text-sm mt-1">{comment.content}</p>
                                  </div>
                                </div>
                              ))}
                              
                              {/* Add comment */}
                              <div className="flex gap-2 mt-4">
                                <Input
                                  placeholder="Add a comment..."
                                  value={commentInputs[solution.id] || ""}
                                  onChange={(e) =>
                                    setCommentInputs({
                                      ...commentInputs,
                                      [solution.id]: e.target.value,
                                    })
                                  }
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      handleAddComment(solution.id);
                                    }
                                  }}
                                />
                                <Button
                                  size="sm"
                                  onClick={() => handleAddComment(solution.id)}
                                >
                                  Post
                                </Button>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      ))
                    ) : (
                      <div className="text-center py-8">
                        <p className="text-muted-foreground">
                          No solutions shared yet. Be the first to contribute!
                        </p>
                      </div>
                    )}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          {/* Right pane - Editor and AI Feedback */}
          <div className="vertical-split">
            {/* Top section - Pseudocode Editor */}
            <Card className="flex-1 flex flex-col shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader className="bg-card border-b">
                <CardTitle className="flex justify-between items-center">
                  Your Pseudocode
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleSavePseudocode}
                  >
                    <Save className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </CardTitle>
                <CardDescription>
                  Focus on the approach and algorithm before implementing the
                  code
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 flex flex-col p-6">
                <Textarea
                  className="code-editor flex-1 mb-4 font-mono resize-none"
                  placeholder="Write your pseudocode solution here..."
                  value={pseudocode}
                  onChange={(e) => setPseudocode(e.target.value)}
                />
                <Button
                  onClick={handleGenerateFeedback}
                  disabled={isGeneratingFeedback || !pseudocode.trim()}
                  className="ml-auto"
                >
                  {isGeneratingFeedback ? (
                    "Generating..."
                  ) : (
                    <>
                      <PlayCircle className="h-4 w-4 mr-2" /> Get AI Feedback
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>

            {/* Bottom section - AI Feedback and History */}
            <Card className="flex-1 flex flex-col overflow-hidden shadow-sm border-slate-200 dark:border-slate-800">
              <CardHeader className="bg-card border-b">
                <CardTitle>AI Feedback</CardTitle>
                <CardDescription>
                  Get insights and improvement suggestions for your solution
                </CardDescription>
              </CardHeader>
              <CardContent className="flex-1 overflow-y-auto p-6">
                {feedback && (
                  <div className="mb-6 p-4 border rounded-md bg-primary/5">
                    <h3 className="text-lg font-medium mb-2 flex items-center">
                      <Sparkles className="h-4 w-4 mr-2 text-primary" />
                      Latest Feedback:
                    </h3>
                    <div className="prose prose-sm dark:prose-invert">
                      {renderMarkdown(feedback)}
                    </div>
                  </div>
                )}

                {isGeneratingFeedback && (
                  <div className="flex items-center justify-center h-32">
                    <div className="animate-pulse flex items-center gap-2">
                      <Circle className="h-4 w-4 animate-spin" />
                      <span>Generating feedback...</span>
                    </div>
                  </div>
                )}

                {!feedback && !isGeneratingFeedback && (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <p className="text-muted-foreground mb-2">
                      Write some pseudocode and get AI feedback on your
                      approach.
                    </p>
                    <Button
                      variant="outline"
                      onClick={handleGenerateFeedback}
                      disabled={!pseudocode.trim()}
                    >
                      <PlayCircle className="h-4 w-4 mr-2" />
                      Get Feedback
                    </Button>
                  </div>
                )}
            

                {attempts.length > 0 && (
                  <div className="mt-8">
                    <h3 className="text-lg font-medium mb-4">
                      Previous Attempts:
                    </h3>
                    <div className="space-y-4">
                      {attempts.map((attempt, index) => (
                        <div
                          key={attempt.id}
                          className="border rounded-md overflow-hidden"
                        >
                          <div className="bg-muted/30 px-4 py-2 flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              Attempt #{attempts.length - index} ·{" "}
                              {new Date(attempt.createdAt).toLocaleString()}
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => setPseudocode(attempt.content)}
                            >
                              Load
                            </Button>
                          </div>
                          <div className="p-4">
                            <pre className="bg-code p-3 rounded-md overflow-x-auto whitespace-pre-wrap text-sm mb-3">
                              {attempt.content.substring(0, 100)}
                              {attempt.content.length > 100 ? "..." : ""}
                            </pre>
                            {attempt.feedback && (
                              <div className="mt-2 border-t pt-3">
                                <span className="text-sm font-medium">
                                  Feedback:
                                </span>
                                <div className="prose prose-sm dark:prose-invert mt-1">
                                  {renderMarkdown(attempt.feedback.substring(0, 150) + 
                                   (attempt.feedback.length > 150 ? "..." : ""))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Delete Solution Confirmation Dialog */}
        <AlertDialog
          open={!!solutionToDelete}
          onOpenChange={(open) => !open && setSolutionToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your solution and all its comments.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteSolution}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete Solution
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

        {/* Delete Comment Confirmation Dialog */}
        <AlertDialog
          open={!!commentToDelete}
          onOpenChange={(open) => !open && setCommentToDelete(null)}
        >
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your comment.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={confirmDeleteComment}
                className="bg-red-500 hover:bg-red-600"
              >
                Delete Comment
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </Layout>
  );
};

export default QuestionDetailPage;