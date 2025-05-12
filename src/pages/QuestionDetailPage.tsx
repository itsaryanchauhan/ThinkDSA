
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle,
  CardDescription
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  Save,
  ArrowLeft,
  Circle,
  PlayCircle,
  Sparkles
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { 
  mockQuestions, 
  mockTopics, 
  generateAIFeedback, 
  Question, 
  Topic, 
  mockPseudocodeAttempts, 
  PseudoCodeAttempt 
} from "@/lib/mock-data";

const QuestionDetailPage = () => {
  const { topicId, questionId } = useParams<{ topicId: string, questionId: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [question, setQuestion] = useState<Question | null>(null);
  const [pseudocode, setPseudocode] = useState("");
  const [attempts, setAttempts] = useState<PseudoCodeAttempt[]>([]);
  const [isGeneratingFeedback, setIsGeneratingFeedback] = useState(false);
  const [feedback, setFeedback] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!topicId || !questionId) return;
    
    // Get topic data
    const foundTopic = mockTopics.find(t => t.id === topicId);
    if (foundTopic) {
      setTopic(foundTopic);
      
      // Get question data
      const topicQuestions = mockQuestions[topicId] || [];
      const foundQuestion = topicQuestions.find(q => q.id === questionId);
      if (foundQuestion) {
        setQuestion(foundQuestion);
        
        // Get existing pseudocode attempts
        const questionAttempts = mockPseudocodeAttempts[questionId] || [];
        setAttempts(questionAttempts);
        
        // Set most recent attempt in editor
        if (questionAttempts.length > 0) {
          setPseudocode(questionAttempts[0].content);
        }
      }
    }
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
      createdAt: new Date().toISOString()
    };
    
    // Add to attempts list
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
      // Call mock AI feedback generator
      const generatedFeedback = await generateAIFeedback(pseudocode);
      
      // Update feedback
      setFeedback(generatedFeedback);
      
      // Save attempt with feedback
      const newAttempt: PseudoCodeAttempt = {
        id: `p${questionId}-${Date.now()}`,
        questionId: questionId!,
        content: pseudocode,
        createdAt: new Date().toISOString(),
        feedback: generatedFeedback
      };
      
      // Add to attempts list
      setAttempts([newAttempt, ...attempts]);
    } catch (error) {
      toast.error("Failed to generate feedback");
    } finally {
      setIsGeneratingFeedback(false);
    }
  };

  const handleToggleUnderstood = () => {
    if (!question) return;
    
    // Toggle isUnderstood status
    const updatedQuestion = { 
      ...question, 
      isUnderstood: !question.isUnderstood 
    };
    
    setQuestion(updatedQuestion);
    
    toast.success(
      updatedQuestion.isUnderstood 
        ? "Question marked as understood!"
        : "Question marked as needs review"
    );
  };

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
              <h1 className="text-2xl font-bold truncate max-w-[400px]">{question.title}</h1>
              <div className="flex gap-2">
                <Badge variant={
                  question.difficulty === "Easy" ? "outline" : 
                  question.difficulty === "Medium" ? "secondary" : 
                  "destructive"
                }>
                  {question.difficulty}
                </Badge>
                <Badge variant="outline">{question.source}</Badge>
                <Badge 
                  variant={question.isUnderstood ? "default" : "outline"}
                  className="cursor-pointer"
                  onClick={handleToggleUnderstood}
                >
                  {question.isUnderstood ? 
                    <><CheckCircle className="h-3.5 w-3.5 mr-1" /> Understood</> : 
                    <><Circle className="h-3.5 w-3.5 mr-1" /> Not Marked</>}
                </Badge>
              </div>
            </div>
            <Button 
              variant="outline" 
              asChild
            >
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
                </TabsList>
                <TabsContent value="original" className="m-0">
                  <div className="problem-description" 
                    dangerouslySetInnerHTML={{ __html: question.description }} 
                  />
                </TabsContent>
                {question.variations.map((variation, idx) => (
                  <TabsContent key={variation.id} value={`var-${idx}`} className="m-0">
                    <h3 className="text-xl font-semibold mb-2">{variation.title}</h3>
                    <p className="mb-4">{variation.description}</p>
                    <p className="text-muted-foreground text-sm mt-4">
                      Think about how you would modify your solution to handle this variation.
                    </p>
                  </TabsContent>
                ))}
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
                  Focus on the approach and algorithm before implementing the code
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
                  disabled={isGeneratingFeedback}
                  className="ml-auto"
                >
                  {isGeneratingFeedback ? 
                    "Generating..." : 
                    <><PlayCircle className="h-4 w-4 mr-2" /> Get AI Feedback</>
                  }
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
                    <p className="whitespace-pre-line">{feedback}</p>
                  </div>
                )}
                
                {!feedback && !isGeneratingFeedback && (
                  <div className="flex flex-col items-center justify-center h-32 text-center">
                    <p className="text-muted-foreground mb-2">
                      Write some pseudocode and get AI feedback on your approach.
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
                    <h3 className="text-lg font-medium mb-4">Previous Attempts:</h3>
                    <div className="space-y-4">
                      {attempts.map((attempt, index) => (
                        <div key={attempt.id} className="border rounded-md overflow-hidden">
                          <div className="bg-muted/30 px-4 py-2 flex justify-between items-center">
                            <div className="text-sm text-muted-foreground">
                              Attempt #{attempts.length - index} · {new Date(attempt.createdAt).toLocaleString()}
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
                                <span className="text-sm font-medium">Feedback:</span>
                                <p className="text-sm text-muted-foreground mt-1 whitespace-pre-line">
                                  {attempt.feedback.substring(0, 150)}
                                  {attempt.feedback.length > 150 ? "..." : ""}
                                </p>
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
      </div>
    </Layout>
  );
};

export default QuestionDetailPage;
