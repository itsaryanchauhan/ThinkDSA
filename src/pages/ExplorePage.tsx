
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
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Sparkles } from "lucide-react";
import Layout from "@/components/layout/Layout";
import { mockTopics, mockQuestions } from "@/lib/mock-data";

const ExplorePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  // Create trending topics - just using mock data
  const trendingTopics = mockTopics.slice(0, 3);
  
  // Flatten all questions into a single array
  const allQuestions = Object.values(mockQuestions).flat();
  
  // Sort by date descending (newest first)
  const recentQuestions = [...allQuestions].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  ).slice(0, 5);
  
  // Filter by difficulty
  const hardQuestions = allQuestions.filter(q => q.difficulty === "Hard").slice(0, 5);

  return (
    <Layout requireAuth>
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold">Explore DSA Problems</h1>
          <p className="text-muted-foreground mt-2 max-w-2xl mx-auto">
            Discover trending topics, popular problems, and more to enhance your DSA learning journey
          </p>
          <div className="flex w-full max-w-xl mx-auto mt-6">
            <Input
              placeholder="Search topics or problems..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="rounded-r-none"
            />
            <Button className="rounded-l-none">
              <Search className="h-4 w-4 mr-2" />
              Search
            </Button>
          </div>
        </div>

        <div className="mb-12">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="h-5 w-5 text-primary" />
            <h2 className="text-2xl font-semibold">Trending Topics</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trendingTopics.map((topic) => (
              <Card 
                key={topic.id}
                className="cursor-pointer hover:border-primary/50 transition-all"
                onClick={() => navigate(`/topic/${topic.id}`)}
              >
                <CardHeader>
                  <CardTitle>{topic.title}</CardTitle>
                  {topic.description && (
                    <CardDescription>{topic.description}</CardDescription>
                  )}
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="text-muted-foreground">Questions: </span>
                      <span className="font-medium">{topic.questionCount}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="border-t pt-4">
                  <Button size="sm" className="w-full">
                    Explore Topic
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">Browse Problems</h2>
          <Tabs defaultValue="recent">
            <TabsList className="mb-6">
              <TabsTrigger value="recent">Recent Problems</TabsTrigger>
              <TabsTrigger value="hard">Hard Problems</TabsTrigger>
            </TabsList>
            
            <TabsContent value="recent" className="m-0">
              <div className="space-y-4">
                {recentQuestions.map((question) => (
                  <Card 
                    key={question.id}
                    className="cursor-pointer hover:border-primary/50 transition-all"
                    onClick={() => navigate(`/topic/${question.topicId}/question/${question.id}`)}
                  >
                    <CardHeader>
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">{question.title}</CardTitle>
                        <div className="flex gap-2">
                          <Badge variant={
                            question.difficulty === "Easy" ? "outline" : 
                            question.difficulty === "Medium" ? "secondary" : 
                            "destructive"
                          }>
                            {question.difficulty}
                          </Badge>
                          <Badge variant="outline">{question.source}</Badge>
                        </div>
                      </div>
                      <CardDescription>
                        {mockTopics.find(t => t.id === question.topicId)?.title || "Unknown Topic"}
                      </CardDescription>
                    </CardHeader>
                    <CardFooter className="border-t pt-4">
                      <Button variant="secondary" size="sm" className="ml-auto">
                        View Problem
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="hard" className="m-0">
              <div className="space-y-4">
                {hardQuestions.length > 0 ? (
                  hardQuestions.map((question) => (
                    <Card 
                      key={question.id}
                      className="cursor-pointer hover:border-primary/50 transition-all"
                      onClick={() => navigate(`/topic/${question.topicId}/question/${question.id}`)}
                    >
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <CardTitle className="text-xl">{question.title}</CardTitle>
                          <div className="flex gap-2">
                            <Badge variant="destructive">
                              {question.difficulty}
                            </Badge>
                            <Badge variant="outline">{question.source}</Badge>
                          </div>
                        </div>
                        <CardDescription>
                          {mockTopics.find(t => t.id === question.topicId)?.title || "Unknown Topic"}
                        </CardDescription>
                      </CardHeader>
                      <CardFooter className="border-t pt-4">
                        <Button variant="secondary" size="sm" className="ml-auto">
                          View Problem
                        </Button>
                      </CardFooter>
                    </Card>
                  ))
                ) : (
                  <div className="text-center py-12">
                    <h3 className="font-semibold text-xl mb-2">No hard problems yet</h3>
                    <p className="text-muted-foreground">
                      Hard problems will appear here as they are added.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default ExplorePage;
