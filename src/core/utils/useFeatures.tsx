import { Zap, Eye, Palette, Save, Users, Star, Code2 } from "lucide-react";
import { JSX } from "react";

type Item = {
  icon: JSX.Element;
  title: string;
  description: string;
};

export const useFeatures = () => {
  const features: Item[] = [
    {
      icon: <Code2 className="h-6 w-6" />,
      title: "Syntax Highlighting",
      description: "Beautiful syntax highlighting for HTML and CSS with theme support",
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Smart Autocomplete",
      description: "Intelligent code completion that speeds up your development workflow",
    },
    {
      icon: <Eye className="h-6 w-6" />,
      title: "Live Preview",
      description: "See your changes instantly with real-time preview functionality",
    },
    {
      icon: <Palette className="h-6 w-6" />,
      title: "Multi-Language Support",
      description: "Currently supporting HTML and CSS with more languages coming soon",
    },
  ];

  const benefits: Item[] = [
    {
      icon: <Save className="h-5 w-5" />,
      title: "Cloud Storage",
      description: "Save your projects securely in the cloud and access them anywhere",
    },
    {
      icon: <Users className="h-5 w-5" />,
      title: "Collaboration",
      description: "Share your projects with team members and collaborate in real-time",
    },
    {
      icon: <Star className="h-5 w-5" />,
      title: "Premium Features",
      description: "Access advanced features like custom themes and export options",
    },
  ];

  return { features, benefits };
};
