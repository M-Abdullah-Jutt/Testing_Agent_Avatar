import { useGLTF } from "@react-three/drei";
import { useDataChannel } from "@livekit/components-react";
import { useRef } from "react";

export function Avatar() {
  // 1. Get a model from Ready Player Me. Ensure the URL ends with the morphTargets parameter!
// src/Avatar.jsx
// src/Avatar.jsx
  const { nodes, scene } = useGLTF("https://models.readyplayer.me/65a8dba831b23abb4f401bae.glb?morphTargets=Oculus%20Visemes");
  // 2. Listen for the 'lip-sync' topic from your agent.py
  useDataChannel((message) => {
      const data = JSON.parse(new TextDecoder().decode(message.payload));
      
      // We must check if 'data.data' exists because that's how you sent it in agent.py
      if (data.type === "viseme" && data.data) {
        const head = nodes.Wolf3D_Head || nodes.Wolf3D_Avatar;
        if (head && head.morphTargetInfluences) {
          // Apply the mouth shape intensity
          head.morphTargetInfluences[data.data.index] = data.data.value;
        }
      }
    }, "lip-sync");

  return <primitive object={scene} scale={1.0} position={[0, -1.3, 0]} />;
}