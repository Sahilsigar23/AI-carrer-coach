import { createBrowserRouter, Navigate } from "react-router-dom";
import RootLayout from "../layout/RootLayout";
import AuthLayout from "../layout/AuthLayout";
import Register from "../components/auth/Register";
import Login from "../components/auth/Login";
import Dashboard from "../pages/Dashboard"
import TestPage from "../pages/TestPage"
import SimpleDashboard from "../pages/SimpleDashboard"
import ResumeAnalyzer from "../pages/ResumeAnalyzer"
import RoadmapGenerator from "../pages/RoadmapGenerator"
import CareerQA from "../pages/CareerQA"
import MyHistory from "../pages/MyHistory"
import Settings from "../pages/Settings"
import JobRecommendations from "../pages/JobRecommendations"
import SkillsGap from "../pages/SkillsGap"
import Roadmap from "../pages/Roadmap"
import JobMatches from "../pages/JobMatches"
import ProgressBadges from "../pages/ProgressBadges"
import HelpSupport from "../pages/HelpSupport"
import Reports from "../pages/Reports"
import ErrorPage from "../pages/ErrorPage"

const router = createBrowserRouter([
  {
    path: "/auth",
    Component: AuthLayout,
    errorElement: <ErrorPage/>,
    children: [
      {
        path: "register",
        Component: Register
      },
      {
        path: "login",
        Component: Login
      },
    ],
  },
  {
    path: "/",
    Component: RootLayout,
    errorElement: <ErrorPage/>,
    children: [
      {
        index: true,
        element: <Dashboard />
      },
      {
        path:"dashboard",
        Component: Dashboard
      },
      {
        path:"resume-analyzer",
        Component: ResumeAnalyzer
      },
      {
        path:"roadmap-generator",
        Component: RoadmapGenerator
      },
      {
        path:"career-qa",
        Component: CareerQA
      },
      {
        path:"my-history",
        Component: MyHistory
      },
      {
        path:"settings",
        Component: Settings
      },
      {
        path:"job-recommendations",
        Component: JobRecommendations
      },
      {
        path:"skills-gap",
        Component: SkillsGap
      },
      {
        path:"roadmap",
        Component: Roadmap
      },
      {
        path:"job-matches",
        Component: JobMatches
      },
      {
        path:"progress-badges",
        Component: ProgressBadges
      },
      {
        path:"help-support",
        Component: HelpSupport
      },
      {
        path:"reports",
        Component: Reports
      }
    ],
  },
]);

export default router;