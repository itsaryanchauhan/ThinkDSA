
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { 
  CheckCircle, 
  ExternalLink, 
  Plus, 
  Clock, 
  AlertCircle
} from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { mockTopics, mockQuestions, Topic, Question } from "@/lib/mock-data";

const TopicDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newQuestionLink, setNewQuestionLink] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;
    
    // Get topic data
    const foundTopic = mockTopics.find(t => t.id === id);
    if (foundTopic) {
      setTopic(foundTopic);
      
      // Get questions for this topic
      const topicQuestions = mockQuestions[id] || [];
      setQuestions(topicQuestions);
    }
  }, [id]);

  const handleAddQuestion = async () => {
    if (!newQuestionLink.trim()) {
      toast.error("Please enter a question link");
      return;
    }
    
    setIsLoading(true);
    
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock question creation from link
      const source = newQuestionLink.includes("leetcode") ? "LeetCode" :
                    newQuestionLink.includes("geeksforgeeks") ? "GeeksForGeeks" : 
                    "Other";
                    
      const newQuestion: Question = {
        id: `${Date.now()}`,
        title: source === "LeetCode" ? "New LeetCode Problem" : 
               source === "GeeksForGeeks" ? "New GFG Problem" : 
               "New Coding Problem",
        difficulty: "Medium",
        sourceUrl: newQuestionLink,
        source,
        description: "This problem was extracted from the provided link. Please solve it carefully.",
        topicId: id!,
        createdAt: new Date().toISOString(),
        userId: "1",
        isUnderstood: false,
        variations: [
          {
            id: `v-${Date.now()}-1`,
            title: "Variation 1",
            description: "A slightly modified version of the original problem."
          },
          {
            id: `v-${Date.now()}-2`,
            title: "Variation 2",
            description: "Another way to approach this problem with different constraints."
          }
        ]
      };
      
      // Add to questions list
      setQuestions([newQuestion, ...questions]);
      
      // Update topic question count
      if (topic) {
        const updatedTopic = { ...topic, questionCount: topic.questionCount + 1 };
        setTopic(updatedTopic);
      }
      
      // Reset dialog
      setNewQuestionLink("");
      setIsAddDialogOpen(false);
      
      toast.success("Question added successfully");
    } catch (error) {
      toast.error("Failed to add question");
    } finally {
      setIsLoading(false);
    }
  };

  if (!topic) {
    return (
      <Layout requireAuth>
        <div className="flex justify-center items-center h-64">
          <Alert className="max-w-md">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Topic not found</AlertTitle>
            <AlertDescription>
              The topic you're looking for doesn't exist or has been removed.
            </AlertDescription>
          </Alert>
        </div>
      </Layout>
    );
  }

  return (
    <Layout requireAuth>
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => navigate("/")}
                className="text-muted-foreground hover:text-foreground"
              >
                Topics
              </Button>
              <span className="text-muted-foreground">/</span>
              <h1 className="text-3xl font-bold">{topic.title}</h1>
            </div>
            {topic.description && (
              <p className="text-muted-foreground mt-1">{topic.description}</p>
            )}
          </div>
          <Button onClick={() => setIsAddDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-1" />
            Add Question
          </Button>
        </div>

        <div className="space-y-6">
          {questions.map((question) => (
            <Card 
              key={question.id}
              className="cursor-pointer hover:border-primary/50 transition-all"
              onClick={() => navigate(`/topic/${id}/question/${question.id}`)}
            >
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle>{question.title}</CardTitle>
                    <CardDescription className="flex items-center gap-2 mt-1">
                      <Badge variant={question.difficulty === "Easy" ? "outline" : 
                                      question.difficulty === "Medium" ? "secondary" : 
                                      "destructive"}
                      >
                        {question.difficulty}
                      </Badge>
                      <Badge variant="outline">{question.source}</Badge>
                    </CardDescription>
                  </div>
                  {question.isUnderstood && (
                    <Badge className="bg-green-600 hover:bg-green-700">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Understood
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-muted-foreground">Variations: </span>
                    <span className="font-medium">{question.variations.length}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Added on </span>
                    <span className="font-medium">
                      {new Date(question.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex justify-between border-t pt-4">
                <a 
                  href={question.sourceUrl}
                  target="_blank" 
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  className="text-primary hover:underline flex items-center text-sm"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  View original problem
                </a>
                <Button 
                  variant="secondary"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/topic/${id}/question/${question.id}`);
                  }}
                >
                  Solve now
                </Button>
              </CardFooter>
            </Card>
          ))}

          {questions.length === 0 && (
            <div className="text-center py-12 border-2 border-dashed rounded-lg p-6 border-muted">
              <h3 className="font-semibold text-xl mb-2">No questions added yet</h3>
              <p className="text-muted-foreground mb-4">
                Add questions from LeetCode, GeeksForGeeks, and other platforms to this topic.
              </p>
              <Button onClick={() => setIsAddDialogOpen(true)}>
                <Plus className="h-4 w-4 mr-1" />
                Add Your First Question
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Add Question Dialog */}
      <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Question to {topic.title}</DialogTitle>
            <DialogDescription>
              Paste a link to a problem from LeetCode, GeeksForGeeks, or other coding platforms.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="link">Problem URL</Label>
              <Input
                id="link"
                placeholder="https://leetcode.com/problems/two-sum/"
                value={newQuestionLink}
                onChange={(e) => setNewQuestionLink(e.target.value)}
              />
            </div>
            <div className="text-sm text-muted-foreground">
              The problem content will be scraped and added to your collection.
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddQuestion} disabled={isLoading}>
              {isLoading ? "Adding..." : "Add Question"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default TopicDetailPage;
