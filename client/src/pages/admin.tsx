import { useEffect } from "react";
import { useLocation } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { apiUrl, getQueryFn, apiRequest } from "@/lib/queryClient";

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

function CardSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-6 w-48" />
      </CardHeader>
      <CardContent className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="border-l-4 border-gray-200 pl-4 py-2 space-y-2">
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-3 w-56" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-24" />
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default function Admin() {
  const [, navigate] = useLocation();

  const { data: user, isLoading: userLoading, isError: userError } = useQuery<{ id: number } | null>({
    queryKey: ["/api/me"],
    queryFn: getQueryFn({ on401: "returnNull" }),
  });

  const { data: applications, isLoading: appsLoading } = useQuery<Application[]>({
    queryKey: ["/api/applications"],
    enabled: !!user,
  });

  const { data: interests, isLoading: interestsLoading } = useQuery<InterestRegistration[]>({
    queryKey: ["/api/interest-registrations"],
    enabled: !!user,
  });

  useEffect(() => {
    if (!userLoading && (user === null || user === undefined) && !userError) {
      navigate("/login");
    }
  }, [user, userLoading, userError, navigate]);

  const isLoading = userLoading || appsLoading || interestsLoading;

  if (userLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-9 w-52 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (userError) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-700 font-medium mb-2">Unable to reach the server</p>
          <p className="text-sm text-gray-500 mb-4">Check that the API is running and DATABASE_URL is configured.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-800"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="h-9 w-52 mb-8" />
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <CardSkeleton />
            <CardSkeleton />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <Tooltip>
            <TooltipTrigger asChild>
              <button
                onClick={async () => {
                  await apiRequest("POST", "/api/logout");
                  navigate("/login");
                }}
                className="px-4 py-2 text-sm font-medium text-white bg-gray-700 rounded hover:bg-gray-800"
              >
                Log out
              </button>
            </TooltipTrigger>
            <TooltipContent>Sign out of the admin dashboard</TooltipContent>
          </Tooltip>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Applications */}
          {appsLoading ? (
            <CardSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Program Applications ({applications?.length ?? 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {applications && applications.length > 0 ? (
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
          )}

          {/* Interest Registrations */}
          {interestsLoading ? (
            <CardSkeleton />
          ) : (
            <Card>
              <CardHeader>
                <CardTitle>Interest Registrations ({interests?.length ?? 0})</CardTitle>
              </CardHeader>
              <CardContent>
                {interests && interests.length > 0 ? (
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
                                : interest.areasOfInterest}
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
          )}
        </div>
      </div>
    </div>
  );
}
