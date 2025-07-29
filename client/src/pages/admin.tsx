import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface Application {
  id: number;
  fullName: string;
  email: string;
  startupName: string;
  program: string;
  stage: string;
  createdAt: string;
}

interface InterestRegistration {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  startupName: string;
  hqLocation: string;
  currentStatus?: string;
  areasOfInterest?: string;
  createdAt: string;
}

export default function Admin() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [interests, setInterests] = useState<InterestRegistration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch both endpoints simultaneously
        const [interestsResponse, applicationsResponse] = await Promise.all([
          fetch("/api/interest-registrations"),
          fetch("/api/applications")
        ]);

        if (!interestsResponse.ok || !applicationsResponse.ok) {
          throw new Error("Failed to fetch data from server");
        }

        const [interestsData, applicationsData] = await Promise.all([
          interestsResponse.json(),
          applicationsResponse.json()
        ]);

        setInterests(interestsData || []);
        setApplications(applicationsData || []);
        setLoading(false);
        
      } catch (err) {
        console.error("Fetch error:", err);
        setError(err instanceof Error ? err.message : "Unknown error occurred");
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          <p className="text-gray-600">Loading with direct fetch...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          <p className="text-red-600">Error: {error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applications */}
          <Card>
            <CardHeader>
              <CardTitle>Program Applications ({applications?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {applications?.length > 0 ? (
                <div className="space-y-4">
                  {applications.map((app) => (
                    <div key={app.id} className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-semibold">{app.fullName}</h3>
                      <p className="text-sm text-gray-600">{app.email}</p>
                      <p className="text-sm"><strong>Startup:</strong> {app.startupName}</p>
                      <p className="text-sm"><strong>Program:</strong> {app.program}</p>
                      <p className="text-sm"><strong>Stage:</strong> {app.stage}</p>
                      <p className="text-sm text-gray-500">
                        {new Date(app.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No applications yet</p>
              )}
            </CardContent>
          </Card>

          {/* Interest Registrations */}
          <Card>
            <CardHeader>
              <CardTitle>Interest Registrations ({interests?.length || 0})</CardTitle>
            </CardHeader>
            <CardContent>
              {interests?.length > 0 ? (
                <div className="space-y-4">
                  {interests.map((interest) => (
                    <div key={interest.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold">{interest.firstName} {interest.lastName}</h3>
                      <p className="text-sm text-gray-600">{interest.email}</p>
                      <p className="text-sm"><strong>Startup:</strong> {interest.startupName}</p>
                      <p className="text-sm"><strong>HQ Location:</strong> {interest.hqLocation}</p>
                      {interest.currentStatus && (
                        <p className="text-sm"><strong>Status:</strong> {interest.currentStatus}</p>
                      )}
                      {interest.areasOfInterest && (
                        <div className="text-sm mt-2">
                          <strong>Challenge:</strong> 
                          <p className="mt-1 text-gray-700 max-w-md">
                            {interest.areasOfInterest.length > 200 
                              ? `${interest.areasOfInterest.substring(0, 200)}...` 
                              : interest.areasOfInterest
                            }
                          </p>
                        </div>
                      )}
                      <p className="text-sm text-gray-500">
                        {new Date(interest.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">No interest registrations yet</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}