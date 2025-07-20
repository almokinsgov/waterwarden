const schema = [
{
  "name": "SceneID",
  "type": "string",
  "label": "Scene ID",
  "description": "Unique identifier for the scene. Used for reference, chaining, echo matching, and scene tracking.",
  "format": "Alphanumeric string with optional underscores or hyphens",
  "example": "desert_intro01",
  "required": true,
  "subfields": [],
  "options": [],
  "tags": ["reference", "metadata", "unique"],
  "metadata": {
    "notes": [
      "Must be unique across all scenes in a video sequence",
      "Best practice is to include thematic or contextual cues in the name (e.g., intro, chase, climax)",
      "Often referenced by the EchoScene field in later segments"
    ],
    "restrictions": ["No whitespace", "No duplicates across timeline"],
    "dependencies": [],
    "usedFor": ["Scene linking", "Narrative tracking", "EchoScene references"],
    "priority": "critical",
    "visibility": "always"
  }
},
{
  "name": "Duration",
  "type": "string",
  "label": "Duration",
  "description": "Total runtime of the scene. Used to time transitions, rhythm, pacing, and narrative density.",
  "format": "String with unit suffix (e.g., '10s' for 10 seconds)",
  "example": "10s",
  "required": true,
  "subfields": [],
  "options": ["3s", "5s", "10s", "15s", "20s"],
  "tags": ["timing", "pacing", "scene-metadata"],
  "metadata": {
    "notes": [
      "Duration should match or complement the scene’s emotional rhythm and shot density",
      "Affects pacing logic in combination with Tempo and SceneRhythm",
      "Used for sequencing and time budgeting during editing or generation"
    ],
    "restrictions": ["Must be one of the predefined durations unless custom allowed", "Suffix 's' must always be included"],
    "dependencies": ["Tempo", "SceneRhythm", "CutStyle"],
    "usedFor": ["Timing control", "Scene planning", "Narrative rhythm calibration"],
    "priority": "high",
    "visibility": "always"
  }
},
{
  "name": "Environment",
  "type": "object",
  "label": "Environment",
  "description": "Defines the physical and atmospheric setting of the scene, including place, time, weather, and spatial depth. It sets the tone, realism, and contextual anchor for all other elements.",
  "example": {
    "Location": "Montmartre street corner near café",
    "Time": "Evening during citywide blackout",
    "Weather": "Dry air, no wind",
    "Temperature": "Cool spring night",
    "Depth": "Long empty street vanishing into unlit buildings"
  },
  "required": true,
  "subfields": [
    {
      "name": "Location",
      "type": "string",
      "label": "Location",
      "description": "Describes the specific geographical or constructed setting in which the scene takes place",
      "example": "Pompeii marketplace under ash sky",
      "required": true,
      "tags": ["setting", "visual", "geography"]
    },
    {
      "name": "Time",
      "type": "string",
      "label": "Time",
      "description": "Indicates the time of day or narrative time context (e.g., blackout, festival)",
      "example": "Afternoon, sun dimmed",
      "options": ["Morning", "Noon", "Afternoon", "Evening", "Dusk", "Night", "Late night", "Twilight", "Sunrise", "Blackout"],
      "tags": ["lighting", "contextual-time", "story anchor"]
    },
    {
      "name": "Weather",
      "type": "string",
      "label": "Weather",
      "description": "Describes atmospheric conditions that may influence mood, visuals, or character behavior",
      "example": "Volcanic ashfall",
      "tags": ["atmosphere", "scene-conditions", "mood"]
    },
    {
      "name": "Temperature",
      "type": "string",
      "label": "Temperature",
      "description": "Describes the ambient temperature or climate feel, especially when relevant to behavior or clothing",
      "example": "Boiling air",
      "tags": ["atmosphere", "comfort", "weather"]
    },
    {
      "name": "Depth",
      "type": "string",
      "label": "Depth",
      "description": "Spatial layering of the background or environment, indicating perspective or scope",
      "example": "Buildings collapse in far distance",
      "tags": ["space", "depth-cue", "visual-range"]
    }
  ],
  "tags": ["setting", "environment", "context", "cinematic grounding"],
  "metadata": {
    "notes": [
      "Environment supports emotional tone and can drive symbolic meaning when paired with symbolism",
      "Location and Depth are used to spatially anchor camera and lighting logic",
      "Weather and Time directly influence Lighting configuration"
    ],
    "restrictions": ["Subfields must use vivid, interpretable descriptions"],
    "dependencies": ["Lighting", "Camera.Angle", "Characters.BodyState", "Style.Mood"],
    "usedFor": ["Visual grounding", "Atmosphere definition", "World-building consistency"],
    "priority": "essential",
    "visibility": "always"
  }
},
{
  "name": "Characters",
  "type": "object",
  "label": "Characters",
  "description": "Defines the people, beings, or entities present in the scene. Each character entry describes their appearance, state, emotions, and role-based function.",
  "roles": ["Primary", "Secondary", "Tertiary"],
  "required": false,
  "subfields": [
    {
      "name": "Name",
      "type": "string",
      "label": "Name",
      "description": "The identifier or name of the character (can be a role or placeholder if unknown)",
      "example": "Elder Woman", 
      "tags": ["id", "reference", "label"]
    },
    {
      "name": "Type",
      "type": "string",
      "label": "Type",
      "description": "Biological or conceptual classification of the character",
      "options": ["Human", "Robot", "Animal", "Alien", "Spirit", "Synthetic Entity"],
      "example": "Spirit",
      "tags": ["category", "species", "conceptual"]
    },
    {
      "name": "Age",
      "type": "string",
      "label": "Age",
      "description": "Approximate or narrative-relevant age descriptor",
      "example": "Elderly",
      "tags": ["descriptor", "contextual"]
    },
    {
      "name": "Appearance",
      "type": "string",
      "label": "Appearance",
      "description": "Physical traits such as build, skin, features, or distinguishing marks",
      "example": "Thin, wrinkled, deep scars under eyes",
      "tags": ["visual", "trait", "identity"]
    },
    {
      "name": "Clothing",
      "type": "string",
      "label": "Clothing",
      "description": "Visible attire or worn gear; may imply role, function, or time period",
      "example": "Ceremonial robes, threadbare with ash stains",
      "tags": ["costume", "period", "role"]
    },
    {
      "name": "BodyState",
      "type": "string",
      "label": "Body State",
      "description": "Describes current body posture or stance",
      "options": ["Standing", "Crouching", "Lying", "Cross-legged", "Leaning", "Collapsed", "Floating"],
      "example": "Cross-legged",
      "tags": ["pose", "physical", "scene cue"]
    },
    {
      "name": "Gesture",
      "type": "string",
      "label": "Gesture",
      "description": "Voluntary body movement indicating emotion, signal, or action",
      "example": "Hands raised in supplication",
      "tags": ["movement", "emotion", "intention"]
    },
    {
      "name": "Gaze",
      "type": "string",
      "label": "Gaze",
      "description": "Direction or intensity of eye contact or attention",
      "example": "Fixed on distant volcano",
      "tags": ["focus", "expression", "tension"]
    },
    {
      "name": "EmotionOuter",
      "type": "string",
      "label": "Outer Emotion",
      "description": "Externally visible emotional state or expression",
      "example": "Solemn",
      "tags": ["affect", "mood", "communication"]
    },
    {
      "name": "EmotionInner",
      "type": "string",
      "label": "Inner Emotion",
      "description": "Internally felt or privately held emotion, possibly in contrast to the outer state",
      "example": "Panic",
      "tags": ["hidden", "contrast", "character insight"]
    }
  ],
  "tags": ["agent", "actor", "subject", "entity", "embodied role"],
  "metadata": {
    "notes": [
      "Primary characters are assumed to appear first and dominate focus",
      "Each character can reflect narrative shifts via posture or emotion",
      "Inner and Outer Emotion allow dissonance modeling"
    ],
    "restrictions": ["Characters must include at least a Name and Type when declared"],
    "dependencies": ["Camera.Focus", "FocalPoint", "Dialogue", "Interactions"],
    "usedFor": ["Visual targeting", "Scene tension", "Narrative interaction"],
    "priority": "high",
    "visibility": "conditional (only if agents are needed)"
  }
},
{
  "name": "Actions",
  "type": "string",
  "label": "Actions",
  "description": "Narrative or physical actions occurring in the scene. Describes meaningful movement, gestures, or behaviors performed by characters or entities.",
  "example": "She exhales and steps forward slowly",
  "required": false,
  "subfields": [],
  "options": [],
  "tags": ["movement", "narrative", "character", "motion"],
  "metadata": {
    "notes": [
      "Use concise, cinematic language to describe visible actions",
      "Action lines help inform pacing, gesture, and camera motion",
      "Use present-tense and active voice (e.g., 'He raises his hand', not 'His hand was raised')"
    ],
    "restrictions": ["Should be a single sentence or phrase per line", "Avoid including emotion or speech unless relevant to motion"],
    "dependencies": ["Characters", "Camera.Motion", "SceneArc.Action"],
    "usedFor": ["Prompt grounding", "Behavioral cues", "Narrative continuity"],
    "priority": "medium",
    "visibility": "always if motion is present"
  }
},
{
  "name": "Interactions",
  "type": "string",
  "label": "Interactions",
  "description": "Describes direct or indirect interactions between characters, objects, environment, or offscreen elements. Often includes cause-effect moments, reactions, or emergent dynamics.",
  "example": "He hands over the note without speaking",
  "required": false,
  "subfields": [],
  "options": [],
  "tags": ["interaction", "character", "cause-effect", "emergent"],
  "metadata": {
    "notes": [
      "Use natural language to describe specific moments of contact or response",
      "Can include sound-triggered events, gestures between characters, or chain reactions",
      "Interactions help illustrate tension, cooperation, disruption, or background activity"
    ],
    "restrictions": [
      "Avoid pure internal states—Interactions should be observable or implied through behavior",
      "Avoid duplicating content from Actions unless interaction is reciprocal or distinct"
    ],
    "dependencies": ["Characters", "Props", "SoundDesign.FX"],
    "usedFor": ["Scene reactivity", "Behavioral dynamics", "Symbolic cause and response"],
    "priority": "medium",
    "visibility": "recommended for multi-entity or active environments"
  }
},
{
  "name": "Camera",
  "type": "object",
  "label": "Camera",
  "description": "Defines how the scene is visually captured, including shot type, motion, lens style, and framing choices. Critical for shaping the viewer's perspective and emotional proximity.",
  "required": false,
  "fields": [
    {
      "name": "ShotType",
      "type": "string",
      "label": "Shot Type",
      "description": "The overall framing or distance of the shot from the subject.",
      "options": ["Close-up", "Medium", "Wide", "Extreme close-up", "Over-the-shoulder", "Tracking wide"],
      "example": "Over-the-shoulder"
    },
    {
      "name": "Angle",
      "type": "string",
      "label": "Angle",
      "description": "The vertical or horizontal position from which the shot is captured.",
      "example": "Tilted from left rear"
    },
    {
      "name": "Motion",
      "type": "string",
      "label": "Motion",
      "description": "Any movement of the camera during the shot, either handheld or mechanically controlled.",
      "options": ["Static", "Tracking left", "CraneDown", "Pan", "Tilt", "Dolly", "Handheld", "Glide"],
      "example": "Jittery handheld pull-in"
    },
    {
      "name": "Focus",
      "type": "string",
      "label": "Focus",
      "description": "What the camera lens is focused on during the shot.",
      "example": "Fingers typing, then screen text briefly visible"
    },
    {
      "name": "Framing",
      "type": "string",
      "label": "Framing",
      "description": "Placement of key visual subjects within the frame.",
      "options": ["Centered", "Left third", "Right third", "Off-center", "Symmetrical", "Foreground-heavy"],
      "example": "Desk clutter fills lower third"
    },
    {
      "name": "Lens",
      "type": "string",
      "label": "Lens",
      "description": "Type of lens or field-of-view used for visual character or distortion.",
      "options": ["35mm", "50mm", "Telephoto", "Anamorphic wide", "Fish-eye", "Macro"],
      "example": "35mm handheld"
    }
  ],
  "tags": ["cinematography", "framing", "viewer perspective", "technical"],
  "metadata": {
    "notes": [
      "ShotType determines how intimate or distanced the scene feels",
      "Lens choice subtly affects spatial dynamics and realism",
      "Motion adds rhythm or instability depending on technique"
    ],
    "restrictions": [
      "Avoid mixing incompatible motion types unless stylistically justified",
      "Ensure consistency with environment and pacing (e.g. slow dolly for quiet scenes)"
    ],
    "dependencies": ["FocalPoint", "Pacing", "Style.Texture"],
    "usedFor": ["Visual language", "Viewer engagement", "Perspective shaping"],
    "priority": "high",
    "visibility": "strongly recommended"
  }
},
{
  "name": "Lighting",
  "type": "object",
  "label": "Lighting",
  "description": "Describes the light source, direction, and stylistic qualities that define the visual tone of the scene. Influences mood, visibility, and symbolic depth.",
  "required": false,
  "fields": [
    {
      "name": "Source",
      "type": "string",
      "label": "Source",
      "description": "Primary origin of light in the scene, whether natural or artificial.",
      "options": ["Sunlight", "Moonlight", "Firelight", "Lantern", "Neon sign", "Spotlight", "Candle", "Screen glow"],
      "example": "Candle on wooden table"
    },
    {
      "name": "Style",
      "type": "string",
      "label": "Style",
      "description": "Describes the aesthetic treatment of light and how it is cast across the scene.",
      "options": ["Soft", "Harsh", "Flickering", "Ambient", "Shafted", "Rim-lit", "Low key", "High key"],
      "example": "Soft ambient fill with warm hue"
    },
    {
      "name": "Shadows",
      "type": "string",
      "label": "Shadows",
      "description": "Defines the presence, sharpness, and emotional quality of shadows in the frame.",
      "options": ["None", "Hard shadows", "Soft shadows", "Elongated", "Multiple", "Moving"],
      "example": "Flickering shadows cast on stone wall"
    }
  ],
  "tags": ["cinematography", "mood", "visual tone", "symbolism"],
  "metadata": {
    "notes": [
      "Lighting interacts with camera and texture to convey emotional context",
      "Shadow use can indicate threat, isolation, intimacy, or hidden meaning",
      "Style should reflect the thematic arc and not just realism"
    ],
    "restrictions": [
      "Avoid style-lighting conflicts (e.g. harsh light in a soft-texture dream scene)",
      "Ensure shadows do not obscure key narrative elements unless intentional"
    ],
    "dependencies": ["Environment.Time", "Camera.Framing", "Style.Mood"],
    "usedFor": ["Mood design", "Symbolic framing", "Visibility logic"],
    "priority": "high",
    "visibility": "strongly recommended"
  }
},
{
  "name": "Style",
  "type": "object",
  "label": "Style",
  "description": "Defines the artistic and visual tone of the scene through color grading, mood settings, and texture overlays. Influences emotional impression and cinematic identity.",
  "required": false,
  "fields": [
    {
      "name": "ColorGrade",
      "type": "string",
      "label": "Color Grade",
      "description": "Specifies the tonal color treatment applied to the scene.",
      "options": [
        "Warm", "Cool", "Neutral", "Bleach bypass", "Sepia", "High saturation", "Monochrome", "Teal-orange", "Cyberpunk", "Earth tones"
      ],
      "example": "Warm earth-toned grade with subtle desaturation"
    },
    {
      "name": "Mood",
      "type": "string",
      "label": "Mood",
      "description": "Sets the emotional resonance of the visual treatment. Can guide or intensify viewer affect.",
      "options": [
        "Serene", "Tense", "Melancholic", "Joyful", "Dystopian", "Dreamlike", "Romantic", "Ominous", "Playful", "Stoic"
      ],
      "example": "Dreamlike with violet ambient overtones"
    },
    {
      "name": "Texture",
      "type": "string",
      "label": "Texture",
      "description": "Applies a visual surface quality that affects depth, realism, and tone (e.g. film grain or painterly blur).",
      "options": [
        "Film grain", "Soft blur", "Canvas", "Crisp digital", "Dusty", "Scratched film", "Polished", "Matte", "Metallic sheen"
      ],
      "example": "Canvas texture overlay with muted color bleed"
    }
  ],
  "tags": ["aesthetic", "color", "cinematic tone", "emotional tone", "textural overlay"],
  "metadata": {
    "notes": [
      "Style is often interdependent with Lighting and Camera choices",
      "Mood should align with narrative or subvert intentionally",
      "Textures can affect perceived realism or stylisation levels"
    ],
    "restrictions": [
      "Avoid strong visual noise when clarity is critical to plot",
      "Conflicting mood and color grade may confuse viewer unless intentional"
    ],
    "dependencies": ["Lighting.Style", "Pacing.Tempo", "SceneArc.Outcome"],
    "usedFor": ["Cinematic identity", "Emotional manipulation", "Visual cohesion"],
    "priority": "medium",
    "visibility": "strongly recommended"
  }
},
{
  "name": "Pacing",
  "type": "object",
  "label": "Pacing",
  "description": "Controls the tempo, visual rhythm, and editing style of the scene. Influences audience tension, perception of time, and emotional flow.",
  "required": false,
  "fields": [
    {
      "name": "Tempo",
      "type": "string",
      "label": "Tempo",
      "description": "Overall speed at which the scene unfolds visually and emotionally.",
      "options": [
        "Slow", "Steady", "Moderate", "Fast", "Frantic", "Suspended", "Accelerating"
      ],
      "example": "Slow"
    },
    {
      "name": "CutStyle",
      "type": "string",
      "label": "Cut Style",
      "description": "The editing transition style used between shots within the scene.",
      "options": [
        "Hard cut", "Crossfade", "Wipe", "Match cut", "Jump cut", "Linger", "Montage", "Smash cut"
      ],
      "example": "Crossfade"
    },
    {
      "name": "SceneRhythm",
      "type": "string",
      "label": "Scene Rhythm",
      "description": "Natural visual or emotional rhythm of the scene. Can be based on movement, breath, dialogue, or ambient pulse.",
      "example": "Breath-paced pauses between gestures"
    }
  ],
  "tags": ["tempo", "editing", "rhythm", "emotion", "visual timing"],
  "metadata": {
    "notes": [
      "Scene rhythm can guide audio scoring and actor delivery",
      "Cut style heavily influences genre feel (e.g. smash cut = high intensity)",
      "Tempo variation between scenes builds narrative texture"
    ],
    "restrictions": [
      "Do not mismatch frantic tempo with slow dialogue unless purposeful",
      "Jump cuts may break immersion if used in solemn or formal scenes"
    ],
    "dependencies": ["SoundDesign.Music", "Camera.Motion", "SceneArc.Action"],
    "usedFor": ["Emotional tension", "Narrative urgency", "Scene flow control"],
    "priority": "high",
    "visibility": "strongly recommended"
  }
},
{
  "name": "Props",
  "type": "object",
  "label": "Props",
  "description": "Describes physical elements that populate the scene, contributing to its visual composition and realism. Props include surface materials, background elements, and set-dressing components.",
  "required": false,
  "fields": [
    {
      "name": "Ground",
      "type": "string",
      "label": "Ground",
      "description": "Describes the terrain or flooring underfoot in the scene.",
      "options": [
        "Cobblestone", "Sand", "Grass", "Mud", "Polished wood", "Rubble", "Ceramic tiles", "Metal grate", "Cracked earth", "Wet asphalt"
      ],
      "example": "Cracked earth"
    },
    {
      "name": "Atmosphere",
      "type": "string",
      "label": "Atmosphere",
      "description": "Describes atmospheric or spatial props suspended or present in the air or background.",
      "options": [
        "Lanterns", "Smoke", "Dust motes", "Incense trails", "Hanging vines", "Floating petals", "Falling ash", "Ribbons", "Neon particles", "None"
      ],
      "example": "Dust motes"
    }
  ],
  "tags": ["terrain", "set dressing", "environmental detail", "immersion", "realism"],
  "metadata": {
    "notes": [
      "Ground textures strongly affect lighting and realism in close shots",
      "Atmospheric props support tone and can be animated for ambient motion",
      "Props can help differentiate scene location even with reused characters"
    ],
    "restrictions": [
      "Avoid overly detailed props if they draw attention away from the focal point",
      "Use sparingly in minimalist or abstract scenes"
    ],
    "dependencies": ["Environment.Location", "Lighting.Shadows", "Camera.ShotType"],
    "usedFor": ["Mood building", "Environmental storytelling", "Visual complexity"],
    "priority": "medium",
    "visibility": "recommended"
  }
},
{
  "name": "Quality",
  "type": "object",
  "label": "Quality",
  "description": "Specifies rendering parameters and visual fidelity options for the scene output. Controls resolution, frame rate, rendering method, and any post-processing effects to be applied.",
  "required": false,
  "fields": [
    {
      "name": "Resolution",
      "type": "string",
      "label": "Resolution",
      "description": "Defines the pixel resolution of the final render, affecting visual clarity and file size.",
      "options": ["720p", "1080p", "4K", "8K"],
      "example": "4K"
    },
    {
      "name": "FrameRate",
      "type": "string",
      "label": "Frame Rate",
      "description": "Sets the number of frames per second for the rendered scene.",
      "options": ["24fps", "30fps", "48fps", "60fps", "120fps"],
      "example": "30fps"
    },
    {
      "name": "RenderingStyle",
      "type": "string",
      "label": "Rendering Style",
      "description": "Applies a predefined rendering mode that affects the overall look and processing behavior.",
      "options": ["Photorealistic", "Illustrative", "Stylised", "Grainy", "Hyperreal", "Monochrome", "Filmic"],
      "example": "Filmic"
    },
    {
      "name": "PostEffects",
      "type": "string",
      "label": "Post Effects",
      "description": "Specifies effects to apply after the base render, such as bloom, film grain, or chromatic aberration.",
      "options": ["None", "Bloom", "Chromatic Aberration", "Depth of Field", "Film Grain", "Lens Distortion"],
      "example": "Film Grain"
    }
  ],
  "tags": ["render", "visual fidelity", "post-processing", "technical output"],
  "metadata": {
    "notes": [
      "Higher resolutions and frame rates significantly increase rendering time and file size.",
      "Post effects can enhance cinematic style but may obscure fine details if overused.",
      "RenderingStyle presets are ideal for maintaining thematic consistency across scenes."
    ],
    "restrictions": [
      "Avoid mixing Filmic and Stylised styles unless doing a deliberate transition.",
      "PostEffects may conflict with certain VFX or lighting setups; test for visual clashes."
    ],
    "dependencies": ["Camera.Lens", "Lighting.Style", "VFX.Type"],
    "usedFor": ["Final visual output quality", "Performance tuning", "Artistic styling"],
    "priority": "high",
    "visibility": "essential for render pipeline"
  }
},
{
  "name": "SoundDesign",
  "type": "object",
  "label": "Sound Design",
  "description": "Defines the ambient, environmental, and musical elements that create the auditory atmosphere of the scene. Influences mood, realism, and immersion.",
  "required": false,
  "fields": [
    {
      "name": "Ambience",
      "type": "string",
      "label": "Ambience",
      "description": "Background environmental soundscape that sets the general mood and location tone.",
      "options": ["Silence", "Forest birds", "City street", "Wind in canyon", "Ocean waves", "Night insects", "Interior hum"],
      "example": "Forest birds"
    },
    {
      "name": "FX",
      "type": "string",
      "label": "FX",
      "description": "Sound effects layered into the scene that enhance key moments or physical interactions.",
      "options": ["Footsteps", "Door creak", "Sparks", "Rain on roof", "Glass shatter", "Breathing", "Heartbeat"],
      "example": "Rain on roof"
    },
    {
      "name": "Music",
      "type": "string",
      "label": "Music",
      "description": "Score or musical theme playing under the scene to shape pacing, tension, or emotion.",
      "options": ["None", "Ambient drone", "Piano motif", "Orchestral build", "Electronic pulse", "Solo cello", "Rhythmic percussion"],
      "example": "Solo cello"
    }
  ],
  "tags": ["audio", "mood", "environment", "atmosphere", "soundtrack"],
  "metadata": {
    "notes": [
      "Ambience tracks should not compete with dialogue or important FX unless intentionally layered.",
      "Use FX sparingly for emphasis—too many overlapping sounds can reduce clarity.",
      "Music can carry emotional cues or symbolic meaning if aligned with the scene arc."
    ],
    "restrictions": [
      "Avoid mixing multiple musical themes unless doing a deliberate tonal shift.",
      "Do not over-layer ambient and FX channels in short scenes; use sound sparsely for impact."
    ],
    "dependencies": ["Pacing.Tempo", "SceneArc.Outcome", "Dialogue.Tone"],
    "usedFor": ["Emotional tone", "Environmental realism", "Pacing and rhythm"],
    "priority": "medium",
    "visibility": "recommended for all but purely visual sequences"
  }
},
{
  "name": "FocalPoint",
  "type": "string",
  "label": "Focal Point",
  "description": "Specifies the primary element in the scene the viewer’s attention should be drawn to. This may influence camera focus, depth of field, and composition.",
  "required": false,
  "example": "The child's trembling hands",
  "options": [],
  "inputFormat": "Natural language phrase or symbolic anchor",
  "tags": ["visual anchor", "viewer attention", "framing", "emphasis"],
  "metadata": {
    "notes": [
      "The focal point should describe a tangible or emotionally salient element within the scene.",
      "Works best when paired with Camera.Focus or Lens configuration.",
      "Can reflect symbolic intent (e.g. candle = hope)."
    ],
    "restrictions": [
      "Avoid vague or abstract terms unless visually grounded.",
      "Should not conflict with Framing or Lens constraints."
    ],
    "dependencies": ["Camera.Focus", "Style.Mood", "SceneArc.Action"],
    "usedFor": ["Guiding viewer attention", "Cinematographic emphasis", "Symbolic layering"],
    "priority": "high",
    "visibility": "always available"
  }
},
{
  "name": "SceneArc",
  "type": "object",
  "label": "Scene Arc",
  "description": "Defines the internal micro-narrative of the scene by specifying the key action and its resulting outcome or shift.",
  "required": false,
  "fields": [
    {
      "name": "Action",
      "type": "string",
      "label": "Action",
      "description": "Describes the pivotal movement, choice, or emotional gesture that defines the core of the scene.",
      "example": "The hero hesitates before lighting the fuse",
      "inputFormat": "Natural language",
      "tags": ["turning point", "decision", "emotional trigger"]
    },
    {
      "name": "Outcome",
      "type": "string",
      "label": "Outcome",
      "description": "Explains what changes or is revealed as a result of the core scene action.",
      "example": "Trust is restored as the fire illuminates their faces",
      "inputFormat": "Natural language",
      "tags": ["resolution", "consequence", "emotional shift"]
    }
  ],
  "tags": ["narrative", "mini-arc", "symbolic structure"],
  "metadata": {
    "notes": [
      "Used to guide the emotional and narrative rhythm of the scene.",
      "SceneArc.Action often maps to camera or character beats, while SceneArc.Outcome should show visible change.",
      "Can represent internal change (emotional clarity) or external consequence (fall of a structure)."
    ],
    "restrictions": [
      "Avoid overly abstract language without cinematic grounding.",
      "Should relate back to visual or auditory cues in the scene (Characters, SoundDesign, Lighting)."
    ],
    "dependencies": ["Characters", "Camera.Motion", "SoundDesign.Music"],
    "usedFor": ["Narrative continuity", "Scene rhythm", "Symbolic emphasis"],
    "priority": "high",
    "visibility": "scene planning and scripting tools"
  }
},
{
  "name": "Symbolism",
  "type": "string",
  "label": "Symbolism",
  "description": "Represents visual or thematic metaphors embedded in the scene, often tied to emotion, narrative, or cultural motifs.",
  "required": false,
  "inputFormat": "Natural language (simple or structured metaphor)",
  "example": "The candle = hope; The shattered mirror = fractured self",
  "tags": ["metaphor", "visual motif", "symbolic representation"],
  "metadata": {
    "notes": [
      "Use Symbolism to create layers of meaning that extend beyond the literal visual elements.",
      "These cues can enhance narrative depth and allow for interpretive audience engagement.",
      "Common metaphors include light as truth, water as emotion, doors as opportunity or finality."
    ],
    "restrictions": [
      "Avoid clichés unless intentionally subverted or recontextualized.",
      "Must be supported visually (through props, lighting, or composition)."
    ],
    "dependencies": ["Props", "Lighting", "Characters.Gesture", "Style.Mood"],
    "usedFor": ["Thematic layering", "Visual storytelling", "Echo development"],
    "priority": "medium",
    "visibility": "narrative design, director’s notes, AI interpretation layer"
  },
  "valueFormats": [
    {
      "type": "structured",
      "format": "Object1 = Meaning1; Object2 = Meaning2",
      "example": "Shadows = Guilt; Fire = Rebirth"
    },
    {
      "type": "freeform",
      "format": "Single embedded metaphor or description",
      "example": "The rising mist suggests forgotten memories"
    }
  ]
},
{
  "name": "EchoScene",
  "type": "string",
  "label": "Echo Scene",
  "description": "Creates continuity by referencing a previous scene via its SceneID. Often used to reflect, mirror, or contrast earlier emotional or visual states.",
  "required": false,
  "inputFormat": "SceneID reference",
  "example": "intro01",
  "tags": ["continuity", "mirror", "callback", "visual echo"],
  "metadata": {
    "notes": [
      "Used to subtly or overtly connect current scenes to earlier ones in the same narrative arc.",
      "Helps the AI or editor maintain thematic, emotional, or visual continuity across a sequence.",
      "Can signal transformation (e.g., same hallway but now burned), emotional development, or cyclical narrative structure."
    ],
    "restrictions": [
      "Referenced SceneID must exist within the full scene dataset.",
      "Should not reference future scenes unless implementing flashforward logic intentionally."
    ],
    "dependencies": ["SceneID", "Style.Mood", "Lighting.Source", "FocalPoint"],
    "usedFor": ["Echo building", "Flashback alignment", "Cyclical narrative logic", "Scene memory recall"],
    "priority": "high if used",
    "visibility": "scene orchestration, emotional arc control, recursive context"
  },
  "valueFormats": [
    {
      "type": "reference",
      "format": "Exact string match to previous SceneID",
      "example": "ceremony_climax"
    }
  ],
  "interactions": {
    "pairedWith": ["Symbolism", "FocalPoint", "SceneArc"],
    "triggers": ["Memory-based emotion", "Visual loop", "Transformation markers"]
  }
},
{
  "name": "VFX",
  "type": "object",
  "label": "VFX",
  "description": "Defines artificial or post-processed visual effects applied to the scene, including particle systems, distortions, overlays, and atmospheric elements.",
  "required": false,
  "fields": [
    {
      "name": "Type",
      "type": "string",
      "label": "Type",
      "description": "The core visual effect being applied.",
      "options": [
        "Particles",
        "Fire",
        "Smoke",
        "Sparks",
        "Rain",
        "Dust",
        "Light Rays",
        "Magic Glow",
        "Explosion",
        "Shockwave",
        "Distortion",
        "Blur",
        "Hologram",
        "Overlay",
        "Fade Effect"
      ],
      "example": "Particles"
    },
    {
      "name": "Source",
      "type": "string",
      "label": "Source",
      "description": "The origin or trigger point of the effect within the scene (object, character, or environment).",
      "example": "Left hand of main character"
    },
    {
      "name": "Intensity",
      "type": "string",
      "label": "Intensity",
      "description": "How strong or dominant the effect appears in the scene.",
      "options": [
        "Subtle",
        "Moderate",
        "High",
        "Extreme"
      ],
      "example": "Moderate"
    }
  ],
  "tags": ["visual", "post-processing", "simulation", "atmosphere"],
  "metadata": {
    "notes": [
      "VFX enhances realism, magic, sci-fi, or symbolic visual language.",
      "Should be consistent with Style and Lighting to avoid visual dissonance.",
      "Supports cinematic moments like transitions, reveals, or powers."
    ],
    "restrictions": [
      "Should not be overused unless intentionally stylistic.",
      "Conflicts may arise with natural lighting unless blended with correct source."
    ],
    "dependencies": ["Camera.Motion", "Lighting.Source", "Style.Texture"],
    "usedFor": ["Enhancing intensity", "Environmental storytelling", "Cinematic spectacle", "Symbolic resonance"],
    "priority": "optional",
    "visibility": "strong impact when used; recommended for signature moments"
  },
  "valueFormats": {
    "Type": {
      "type": "string",
      "format": "Dropdown or tag selector",
      "dynamic": true
    },
    "Source": {
      "type": "string",
      "format": "Freeform reference to object, character, or position"
    },
    "Intensity": {
      "type": "string",
      "format": "Dropdown"
    }
  },
  "interactions": {
    "pairedWith": ["Camera.Motion", "Lighting", "SoundDesign.FX"],
    "triggers": ["Narrative climax", "Scene transformation", "Action intensification"]
  }
},
{
  "name": "Dialogue",
  "type": "object",
  "label": "Dialogue",
  "description": "Contains spoken words, narration, tone, and subtitle preferences for the scene. Dialogue can be character-driven or voiceover.",
  "required": false,
  "fields": [
    {
      "name": "SpokenBy",
      "type": "string",
      "label": "Spoken By",
      "description": "The name or role of the speaker, typically a character or narrator.",
      "example": "Elder woman" 
    },
    {
      "name": "Text",
      "type": "string",
      "label": "Text",
      "description": "The actual dialogue line or spoken phrase in natural language.",
      "example": "We have waited for this day under the shadow of the mountain."
    },
    {
      "name": "Tone",
      "type": "string",
      "label": "Tone",
      "description": "The emotional or performative quality of the voice delivery.",
      "options": [
        "Calm",
        "Urgent",
        "Tense",
        "Joyful",
        "Solemn",
        "Commanding",
        "Narrative",
        "Hushed",
        "Dramatic",
        "Reverent"
      ],
      "example": "Solemn"
    },
    {
      "name": "Subtitles",
      "type": "boolean",
      "label": "Subtitles",
      "description": "Indicates whether subtitles should be displayed for this dialogue.",
      "example": true
    }
  ],
  "tags": ["dialogue", "voice", "narration", "emotion", "accessibility"],
  "metadata": {
    "notes": [
      "Dialogue supports character development, plot advancement, and tonal atmosphere.",
      "Tone and delivery affect viewer interpretation and emotional response.",
      "Subtitles improve accessibility and are recommended for non-verbal scenes or ambiguous voiceovers."
    ],
    "restrictions": [
      "Avoid overly long text in short-duration scenes.",
      "Tone must match the character’s context and environment."
    ],
    "dependencies": ["Characters.Name", "SoundDesign.Music", "SceneArc.Action"],
    "usedFor": ["Exposition", "Emotional grounding", "Narrative clarity", "Accessibility"],
    "priority": "conditional",
    "visibility": "clear impact when present; optional for silent scenes"
  },
  "valueFormats": {
    "SpokenBy": {
      "type": "string",
      "format": "Freeform character name or selector"
    },
    "Text": {
      "type": "string",
      "format": "Natural language string"
    },
    "Tone": {
      "type": "string",
      "format": "Dropdown"
    },
    "Subtitles": {
      "type": "boolean",
      "format": "Boolean selector"
    }
  },
  "interactions": {
    "pairedWith": ["Characters", "SoundDesign.Ambience", "FocalPoint"],
    "triggers": ["Emotional turn", "Scene exposition", "Character entrance"]
  }
},
{
  "name": "PhysicsAdjustments",
  "type": "object",
  "label": "Physics Adjustments",
  "description": "Corrects physical inconsistencies, motion conflicts, or implausible dynamics in the scene, ensuring realism under environmental or animation constraints.",
  "required": false,
  "fields": [
    {
      "name": "Conflict",
      "type": "string",
      "label": "Conflict",
      "description": "Describes the physical or motion-based inconsistency to be resolved.",
      "example": "Arm intersects with rock wall during reach"
    },
    {
      "name": "Adjustment",
      "type": "string",
      "label": "Adjustment",
      "description": "Correction applied to resolve the issue, stated in natural language.",
      "example": "Shift character 0.5m forward to clear collision"
    },
    {
      "name": "Notes",
      "type": "string",
      "label": "Notes",
      "description": "Additional explanation or logic behind the adjustment.",
      "example": "Body state adjusted to avoid unrealistic joint rotation"
    }
  ],
  "tags": ["physics", "realism", "motion correction", "animation logic"],
  "metadata": {
    "notes": [
      "This field supports post-prompt realism enforcement, either during planning or render error handling.",
      "Used by RPAL and fallback realism modules to maintain visual plausibility."
    ],
    "restrictions": [
      "Should only be invoked when physical constraints are violated or animation logic breaks.",
      "Do not use for stylistic exaggerations unless flagged by realism layer."
    ],
    "dependencies": ["Props", "BodyState", "Camera.Motion", "VFX.Type"],
    "usedFor": ["Collision correction", "Motion smoothing", "Joint integrity", "Environmental realism"],
    "priority": "conditional",
    "visibility": "system-triggered or manual override when detected"
  },
  "valueFormats": {
    "Conflict": {
      "type": "string",
      "format": "Freeform error description"
    },
    "Adjustment": {
      "type": "string",
      "format": "Correction instructions, natural language or rule-based"
    },
    "Notes": {
      "type": "string",
      "format": "Explanatory free text or logic rationale"
    }
  },
  "interactions": {
    "pairedWith": ["Environment", "Camera", "Characters.BodyState", "SceneArc.Outcome"],
    "triggers": ["Detected animation inconsistency", "Failed realism check", "Dynamic environmental interaction"]
  }
},
{
  "name": "TriggerEvents",
  "type": "object",
  "label": "Trigger Events",
  "description": "Defines dynamic cause-effect events within or across scenes, often linked to character actions, environmental shifts, or narrative triggers.",
  "required": false,
  "fields": [
    {
      "name": "EventID",
      "type": "string",
      "label": "Event ID",
      "description": "Unique name or reference for the triggerable event.",
      "example": "doorOpens", 
      "valueFormat": "CamelCase or snake_case string"
    },
    {
      "name": "Condition",
      "type": "string",
      "label": "Condition",
      "description": "Describes the condition under which the event is triggered.",
      "example": "Character reaches threshold OR Camera enters hallway zone"
    },
    {
      "name": "Effect",
      "type": "string",
      "label": "Effect",
      "description": "The result or consequence of the event being triggered.",
      "example": "Door slides open revealing a secret room"
    }
  ],
  "tags": ["logic", "conditional", "trigger", "event-driven", "story mechanic"],
  "metadata": {
    "notes": [
      "Used for logical cause-effect modeling between actions and consequences within or across scenes.",
      "Can be used to trigger visuals, sounds, state changes, or narrative transitions."
    ],
    "restrictions": [
      "Avoid overloading a scene with too many simultaneous triggers unless carefully coordinated.",
      "Should not be used to replace core actions; triggers are supporting logic layers."
    ],
    "dependencies": ["Actions", "Interactions", "Environment", "SceneArc"],
    "usedFor": ["Cinematic logic linking", "Conditional animation activation", "Story branching", "Event chaining"],
    "priority": "contextual",
    "visibility": "visible to planners, optionally hidden from viewer-level prompt"
  },
  "valueFormats": {
    "EventID": {
      "type": "string",
      "format": "Identifier-style naming, e.g., sceneStart, fireIgnites"
    },
    "Condition": {
      "type": "string",
      "format": "Freeform natural language or simple logic"
    },
    "Effect": {
      "type": "string",
      "format": "Natural language effect or system response"
    }
  },
  "interactions": {
    "pairedWith": ["SceneArc", "VFX", "SoundDesign", "Camera.Motion", "Characters.Gesture"],
    "triggers": ["Character behavior", "Environment shift", "Previous event resolved", "External system signal"]
  }
}
]; // Replace with full JSON array from scene_schema_metadata.json
