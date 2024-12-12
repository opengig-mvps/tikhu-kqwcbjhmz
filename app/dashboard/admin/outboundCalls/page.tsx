'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';
import { isAxiosError } from 'axios';
import api from '@/lib/api';
import { LoaderCircleIcon } from 'lucide-react';

const OutboundCallsPage: React.FC = () => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState<boolean>(false);
  const [callData, setCallData] = useState<any>({
    customerName: '',
    customerNumber: '',
    script: '',
    callOutcome: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setCallData({ ...callData, [e.target.name]: e.target.value });
  };

  const initiateCall = async () => {
    try {
      setLoading(true);
      const response = await api.post(`/api/admin/outboundCalls`, {
        ...callData,
        agentId: session?.user?.id,
      });

      if (response?.data?.success) {
        toast.success('Call initiated successfully!');
      }
    } catch (error: any) {
      if (isAxiosError(error)) {
        toast.error(error?.response?.data?.message ?? 'Something went wrong');
      } else {
        console.error(error);
        toast.error('An unexpected error occurred');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Initiate Outbound Call</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <Input
              name="customerName"
              placeholder="Customer Name"
              value={callData?.customerName}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Input
              name="customerNumber"
              placeholder="Customer Number"
              value={callData?.customerNumber}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Textarea
              name="script"
              placeholder="AI Script"
              value={callData?.script}
              onChange={handleInputChange}
            />
          </div>
          <div>
            <Select value={callData?.callOutcome} onValueChange={(value: any) => setCallData({ ...callData, callOutcome: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select Call Outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="successful">Successful</SelectItem>
                <SelectItem value="unsuccessful">Unsuccessful</SelectItem>
                <SelectItem value="callback">Callback Required</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="button" className="w-full" onClick={initiateCall}>
            {loading ? <LoaderCircleIcon className="animate-spin" /> : "Initiate Call"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default OutboundCallsPage;