
import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { Textarea } from "@/components/ui/textarea";
import { Plus, LayoutGrid } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { toast } from "sonner";
import { mockTopics, Topic } from "@/lib/mock-data";

const HomePage = () => {
  const [showNewTopicForm, setShowNewTopicForm] = useState(false);
  const [newTopic, setNewTopic] = useState({ title: "", description: "" });
  const [topics, setTopics] = useState<Topic[]>(mockTopics);
  const navigate = useNavigate();

  const handleCreateTopic = () => {
    if (!newTopic.title.trim()) {
      toast.error("Topic title cannot be empty");
      return;
    }

    // Create new topic with generated ID
    const newTopicWithId: Topic = {
      id: `${topics.length + 1}${Math.floor(Math.random() * 1000)}`,
      title: newTopic.title,
      description: newTopic.description,
      createdAt: new Date().toISOString(),
      userId: "1", // Mock user ID
      questionCount: 0
    };

    // Add to topics list
    setTopics([newTopicWithId, ...topics]);
    
    // Reset form
    setNewTopic({ title: "", description: "" });
    setShowNewTopicForm(false);
    
    toast.success("Topic created successfully");
  };

  return (
    <Layout requireAuth>
      <div className="max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold">My DSA Topics</h1>
            <p className="text-muted-foreground mt-1">
              Organize your problem-solving journey by topics
            </p>
          </div>
          <Button onClick={() => setShowNewTopicForm(!showNewTopicForm)}>
            <Plus className="h-4 w-4 mr-1" />
            New Topic
          </Button>
        </div>

        {showNewTopicForm && (
          <Card className="mb-8 border-primary/30 shadow-lg">
            <CardHeader>
              <CardTitle>Create New Topic</CardTitle>
              <CardDescription>
                Add a new topic to organize your DSA problems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Topic Name</Label>
                  <Input 
                    id="title"
                    placeholder="e.g., Array Manipulation, Dynamic Programming"
                    value={newTopic.title}
                    onChange={(e) => setNewTopic({ ...newTopic, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description (Optional)</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe what this topic covers..."
                    value={newTopic.description}
                    onChange={(e) => setNewTopic({ ...newTopic, description: e.target.value })}
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button variant="outline" onClick={() => setShowNewTopicForm(false)}>
                Cancel
              </Button>
              <Button onClick={handleCreateTopic}>Create Topic</Button>
            </CardFooter>
          </Card>
        )}

        <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {topics.map((topic) => (
            <Card 
              key={topic.id}
              className="cursor-pointer hover:border-primary/30 hover:shadow-md transition-all"
              onClick={() => navigate(`/topic/${topic.id}`)}
            >
              <CardHeader className="pb-3">
                <CardTitle className="flex items-start gap-2">
                  <span className="flex-1">{topic.title}</span>
                </CardTitle>
                {topic.description && (
                  <CardDescription className="line-clamp-2">{topic.description}</CardDescription>
                )}
              </CardHeader>
              <CardContent className="pb-3">
                <div className="flex items-center text-sm">
                  <LayoutGrid className="h-4 w-4 text-muted-foreground mr-1" />
                  <span className="text-muted-foreground">Questions: </span>
                  <span className="font-medium ml-1">{topic.questionCount}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-4">
                <div className="text-xs text-muted-foreground">
                  Created on {new Date(topic.createdAt).toLocaleDateString()}
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {topics.length === 0 && (
          <div className="text-center py-12">
            <h3 className="font-semibold text-xl mb-2">No topics yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first topic to get started!
            </p>
            <Button onClick={() => setShowNewTopicForm(true)}>
              <Plus className="h-4 w-4 mr-1" />
              Create Topic
            </Button>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default HomePage;
