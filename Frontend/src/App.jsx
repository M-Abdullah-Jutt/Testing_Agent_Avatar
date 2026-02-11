

// import React, { Suspense, useState } from 'react';
// import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
// import { Canvas } from "@react-three/fiber";
// import { Avatar } from "./Avatar";
// import "@livekit/components-styles";

// // 1. Safety wrapper for 3D errors
// class SceneErrorBoundary extends React.Component {
//   state = { hasError: false };
//   static getDerivedStateFromError() { return { hasError: true }; }
//   render() {
//     if (this.state.hasError) return <div style={{color: 'white'}}>3D Model failed to load.</div>;
//     return this.props.children;
//   }
// }

// export default function App() {
//   return (
//     <LiveKitRoom 
//       serverUrl="wss://personal-interviewer-wxmnbdf0.livekit.cloud" 
//       token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzA3NTg3NzUsImlkZW50aXR5IjoidXNlci0zIiwiaXNzIjoiQVBJdFQ3R3NnWk5uY1pzIiwibmJmIjoxNzcwNzU3ODc1LCJzdWIiOiJ1c2VyLTMiLCJ2aWRlbyI6eyJjYW5QdWJsaXNoIjp0cnVlLCJjYW5QdWJsaXNoRGF0YSI6dHJ1ZSwiY2FuU3Vic2NyaWJlIjp0cnVlLCJyb29tIjoicm9vbS00Iiwicm9vbUpvaW4iOnRydWV9fQ.Gv1vgyptkjiR9Gl4rLR2IZ2wrCAEbm8__6IDux-b3_g"
    
//       connect={true}
//     >
//       <div style={{ height: "100vh", width: "100vw", background: "#111" }}>
//         <SceneErrorBoundary>
//           <Canvas camera={{ position: [0, 1.5, 2], fov: 45 }}>
//             <ambientLight intensity={1} />
//             <Suspense fallback={null}>
//                <Avatar />
//             </Suspense>
//           </Canvas>
//         </SceneErrorBoundary>
//       </div>
//       <RoomAudioRenderer />
//     </LiveKitRoom>
//   );
// }


import React, { Suspense, useState } from 'react';
import { LiveKitRoom, RoomAudioRenderer } from "@livekit/components-react";
import { Canvas } from "@react-three/fiber";
import { Avatar } from "./Avatar";
import "@livekit/components-styles";
import { Environment, ContactShadows } from "@react-three/drei";

export default function App() {
  const [hasStarted, setHasStarted] = useState(false);

  if (!hasStarted) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', background: '#111' }}>
        <button 
          onClick={() => setHasStarted(true)}
          style={{ padding: '20px 40px', fontSize: '20px', cursor: 'pointer', borderRadius: '10px' }}
        >
          Start Interview
        </button>
      </div>
    );
  }

  return (
    <LiveKitRoom 
      serverUrl="wss://personal-interviewer-wxmnbdf0.livekit.cloud" 
      token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3NzA4MDg3MTIsImlkZW50aXR5IjoidXNlci0xMCIsImlzcyI6IkFQSXRUN0dzZ1pObmNacyIsIm5iZiI6MTc3MDgwNzgxMiwic3ViIjoidXNlci0xMCIsInZpZGVvIjp7ImNhblB1Ymxpc2giOnRydWUsImNhblB1Ymxpc2hEYXRhIjp0cnVlLCJjYW5TdWJzY3JpYmUiOnRydWUsInJvb20iOiJyb29tLTEwIiwicm9vbUpvaW4iOnRydWV9fQ.zgQ5jyk-WMRarC4laU0FWYymUMjnqdrwQrsW36tR_Xk" 
      connect={true}
      audio={true}
    >
      <div style={{ height: "100vh", width: "100vw", background: "#111" }}>
        <Canvas camera={{ position: [0, 1.4, 2.2], fov: 35 }}>
          {/* This adds realistic reflections to skin and eyes */}
          <Environment preset="city" /> 
          
          <ambientLight intensity={0.5} />
          <directionalLight position={[2, 2, 2]} intensity={1.5} />

          <Suspense fallback={null}>
            <Avatar />
          </Suspense>

          {/* This adds a soft shadow under the character so they don't look like they are floating */}
          <ContactShadows opacity={0.5} scale={10} blur={1} far={10} resolution={256} color="#000000" />
        </Canvas>
      </div>
      <RoomAudioRenderer />
    </LiveKitRoom>
  );
}