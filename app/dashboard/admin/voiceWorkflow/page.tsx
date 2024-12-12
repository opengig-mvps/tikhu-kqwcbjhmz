"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { DateTimePicker } from "@/components/ui/date-picker";
import { LoaderCircleIcon } from "lucide-react";

export default function VoiceWorkflowPage() {
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      // Mock API call
      setTimeout(() => {
        setLoading(false);
        alert("Voice workflow configured successfully!");
      }, 2000);
    } catch (error: any) {
      setLoading(false);
      console.error("Error configuring voice workflow:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Voice Workflow Configuration</h1>
      <Card>
        <CardHeader>
          <CardTitle>Configure Voice Workflow</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="callRouting" className="block text-sm font-medium text-gray-700">
              Call Routing System
            </label>
            <Input id="callRouting" placeholder="Enter call routing details" />
          </div>

          <div className="space-y-2">
            <label htmlFor="voiceRecognition" className="block text-sm font-medium text-gray-700">
              Voice Recognition Engine
            </label>
            <Input id="voiceRecognition" placeholder="Enter voice recognition details" />
          </div>

          <div className="space-y-2">
            <label htmlFor="responseGeneration" className="block text-sm font-medium text-gray-700">
              Response Generation Module
            </label>
            <Input id="responseGeneration" placeholder="Enter response generation details" />
          </div>

          <div className="space-y-2">
            <label htmlFor="scalability" className="block text-sm font-medium text-gray-700">
              System Scalability
            </label>
            <Input id="scalability" placeholder="Enter scalability details" />
          </div>

          <div className="space-y-2">
            <label htmlFor="integration" className="block text-sm font-medium text-gray-700">
              Telecommunication Integration
            </label>
            <Input id="integration" placeholder="Enter integration details" />
          </div>

          <div className="space-y-2">
            <label htmlFor="schedule" className="block text-sm font-medium text-gray-700">
              Schedule Configuration
            </label>
            <DateTimePicker
              date={selectedDate}
              setDate={(date: Date | undefined) => setSelectedDate(date)}
            />
          </div>
        </CardContent>
        <CardFooter>
          <Button className="w-full" onClick={handleSubmit}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Configure Workflow"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}