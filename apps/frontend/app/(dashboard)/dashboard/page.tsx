"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { StatsCard } from "@/components/dashboard/StatsCard";
import { RecentTests } from "@/components/dashboard/RecentTests";
import { PerformanceChart } from "@/components/dashboard/PerformanceChart";
import { WelcomeModal } from "@/components/dashboard/WelcomeModal";
import { Button } from "@/components/ui/Button";
import { 
  Trophy, 
  Clock, 
  Target, 
  TrendingUp,
  BookOpen,
  Calendar,
  Award,
  Zap,
  Users,
  ArrowRight,
  Play,
  BarChart3,
  Star
} from "lucide-react";

export default function DashboardPage() {
  const { user } = useAuth();
  const searchParams = useSearchParams();
  const [showWelcome, setShowWelcome] = useState(false);

  useEffect(() => {
    // Show welcome modal for new users
    if (searchParams.get('welcome') === 'true') {
      setShowWelcome(true);
    }
  }, [searchParams]);

  // Mock data - replace with actual API calls
 const stats = {
  testsCompleted: user?.stats?.testsCompleted ?? 12,
  averageScore: user?.stats?.averageScore ?? 78,
  timeSpent: user?.stats?.totalTimeSpent ?? 240, // minutes
  streak: user?.stats?.streak ?? 5,
  rank: 145,
  totalUsers: 10234,
};


  const recentActivity = [
    {
      id: 1,
      title: "SSC CGL Mock Test #15",
      score: 85,
      date: "2024-01-15",
      duration: 120,
      status: "completed"
    },
    {
      id: 2,
      title: "Banking Reasoning Test",
      score: 92,
      date: "2024-01-14",
      duration: 90,
      status: "completed"
    },
    {
      id: 3,
      title: "UPSC Prelims Test #8",
      score: 76,
      date: "2024-01-13",
      duration: 150,
      status: "completed"
    }
  ];

  const upcomingTests = [
    {
      id: 1,
      title: "Weekly SSC Challenge",
      date: "2024-01-20",
      time: "10:00 AM",
      duration: 120,
      participants: 1250
    },
    {
      id: 2,
      title: "Banking Sectional Test",
      date: "2024-01-21",
      time: "2:00 PM",
      duration: 90,
      participants: 890
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">
              Welcome back, {user?.name?.split(' ')[0] || 'Student'}! 👋
            </h1>
            <p className="text-blue-100 mb-4">
              Ready to continue your exam preparation journey?
            </p>
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4" />
                <span>Current Streak: {stats.streak} days</span>
              </div>
              <div className="flex items-center space-x-2">
                <Trophy className="h-4 w-4" />
                <span>Rank: #{stats.rank}</span>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <Button className="bg-white/20 hover:bg-white/30 border-white/30">
              Take a Test
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Tests Completed"
          value={stats.testsCompleted}
          change="+3 this week"
          changeType="positive"
          icon={BookOpen}
          iconColor="text-blue-600"
          bgColor="bg-blue-50"
        />
        <StatsCard
          title="Average Score"
          value={`${stats.averageScore}%`}
          change="+5% from last month"
          changeType="positive"
          icon={Target}
          iconColor="text-green-600"
          bgColor="bg-green-50"
        />
        <StatsCard
          title="Time Spent"
          value={`${Math.floor(stats.timeSpent / 60)}h ${stats.timeSpent % 60}m`}
          change="12h this week"
          changeType="neutral"
          icon={Clock}
          iconColor="text-purple-600"
          bgColor="bg-purple-50"
        />
        <StatsCard
          title="Current Streak"
          value={`${stats.streak} days`}
          change="Keep it up!"
          changeType="positive"
          icon={Zap}
          iconColor="text-orange-600"
          bgColor="bg-orange-50"
        />
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Performance Chart */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Performance Trend</h2>
              <div className="flex items-center space-x-2 text-sm text-gray-600">
                <TrendingUp className="h-4 w-4" />
                <span>Last 30 days</span>
              </div>
            </div>
            <PerformanceChart />
          </div>
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          {/* Today's Goal */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Today's Goal</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Practice Time</span>
                <span className="font-medium">2h / 3h</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-600 h-2 rounded-full" style={{ width: '66%' }}></div>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-4 w-4 text-amber-500" />
                <span className="text-sm text-gray-600">1 hour left to reach your goal!</span>
              </div>
            </div>
          </div>

          {/* Quick Start */}
          <div className="bg-white rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Start</h3>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Play className="h-4 w-4 mr-2" />
                Practice Test
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <BarChart3 className="h-4 w-4 mr-2" />
                View Analytics
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Star className="h-4 w-4 mr-2" />
                Mock Test
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity & Upcoming Tests */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Tests */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Recent Activity</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <RecentTests tests={recentActivity} />
        </div>

        {/* Upcoming Tests */}
        <div className="bg-white rounded-xl shadow-sm border p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Upcoming Tests</h2>
            <Button variant="ghost" size="sm">
              View All
            </Button>
          </div>
          <div className="space-y-4">
            {upcomingTests.map((test) => (
              <div key={test.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div>
                  <h4 className="font-medium text-gray-900">{test.title}</h4>
                  <div className="flex items-center space-x-4 text-sm text-gray-600 mt-1">
                    <span>{test.date}</span>
                    <span>{test.time}</span>
                    <div className="flex items-center space-x-1">
                      <Users className="h-3 w-3" />
                      <span>{test.participants}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm">
                  Join
                </Button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Leaderboard Preview */}
      <div className="bg-white rounded-xl shadow-sm border p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-gray-900">Leaderboard</h2>
          <Button variant="ghost" size="sm">
            View Full Leaderboard
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center p-4 bg-gradient-to-br from-amber-50 to-amber-100 rounded-lg">
            <Trophy className="h-8 w-8 text-amber-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Your Rank</p>
            <p className="text-2xl font-bold text-amber-600">#{stats.rank}</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Total Users</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalUsers.toLocaleString()}</p>
          </div>
          <div className="text-center p-4 bg-gradient-to-br from-green-50 to-green-100 rounded-lg">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">Percentile</p>
            <p className="text-2xl font-bold text-green-600">85th</p>
          </div>
        </div>
      </div>

      {/* Welcome Modal */}
      <WelcomeModal 
        isOpen={showWelcome} 
        onClose={() => setShowWelcome(false)} 
      />
    </div>
  );
}
