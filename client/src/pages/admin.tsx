import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Admin() {
  // Immediate debug logging to see what's happening
  console.error("ADMIN COMPONENT LOADING");
  alert("Admin component is loading - check console for data");

  const { data: applications, isLoading: applicationsLoading } = useQuery({
    queryKey: ["/api/applications"],
  });

  const { data: interests, isLoading: interestsLoading, error: interestsError } = useQuery({
    queryKey: ["/api/interest-registrations"],
    retry: false,
    refetchOnMount: "always",
    refetchOnWindowFocus: true,
    staleTime: 0,
    gcTime: 0,
  });

  // Persistent debugging that survives hot reloads
  React.useEffect(() => {
    const timer = setTimeout(() => {
      console.group("🔍 ADMIN DEBUG - PERSISTENT");
      console.log("Applications:", applications);
      console.log("Applications loading:", applicationsLoading);
      console.log("Interests:", interests);
      console.log("Interests loading:", interestsLoading);
      console.log("Interests error:", interestsError);
      console.log("Interests type:", typeof interests);
      console.log("Interests is array:", Array.isArray(interests));
      console.log("Interests length:", interests?.length);
      console.log("Raw interests JSON:", JSON.stringify(interests, null, 2));
      console.groupEnd();
      
      // Also log to the document for absolute visibility
      if (interests !== undefined) {
        document.title = `Admin - Interests: ${interests?.length || 0}`;
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [interests, applications, interestsLoading, applicationsLoading, interestsError]);

  if (applicationsLoading || interestsLoading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (interestsError) {
    console.error("Interest registrations error:", interestsError);
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
                  {applications.map((app: any) => (
                    <div key={app.id} className="border-l-4 border-orange-500 pl-4 py-2">
                      <h3 className="font-semibold">{app.firstName} {app.lastName}</h3>
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
                  {interests.map((interest: any) => (
                    <div key={interest.id} className="border-l-4 border-blue-500 pl-4 py-2">
                      <h3 className="font-semibold">{interest.firstName} {interest.lastName}</h3>
                      <p className="text-sm text-gray-600">{interest.email}</p>
                      <p className="text-sm"><strong>Startup:</strong> {interest.startupName}</p>
                      <p className="text-sm"><strong>HQ Location:</strong> {interest.hqLocation}</p>
                      {interest.currentStatus && (
                        <p className="text-sm"><strong>Status:</strong> {interest.currentStatus}</p>
                      )}
                      {interest.areasOfInterest && (
                        <p className="text-sm"><strong>Challenge:</strong> {interest.areasOfInterest}</p>
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