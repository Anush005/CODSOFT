import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { imageBase64, mimeType, imageUrl } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");

    if (!imageBase64 && !imageUrl) throw new Error("No image provided");

    // Build the image content part
    const imageContent = imageUrl
      ? { type: "image_url" as const, image_url: { url: imageUrl } }
      : { type: "image_url" as const, image_url: { url: `data:${mimeType || "image/jpeg"};base64,${imageBase64}` } };

    

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are an expert image captioning AI that combines computer vision and natural language processing. Analyze images like a CNN feature extractor (ResNet/VGG) would, identifying objects, scenes, actions, colors, textures, spatial relationships, and emotions. Then, like a transformer decoder, generate rich, descriptive captions.

Respond with a JSON object (no markdown) with these fields:
- "caption": A single, eloquent sentence describing the image (30-60 words)
- "detailed": A rich paragraph with 3-5 sentences describing the image in detail, covering objects, scene, mood, colors, composition
- "tags": An array of 5-10 relevant tags/keywords
- "confidence": A number 0-1 representing your confidence in the caption accuracy`
          },
          {
            role: "user",
            content: [
              imageContent,
              {
                type: "text",
                text: "Analyze this image and generate captions. Return only valid JSON.",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again shortly." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Usage limit reached. Please add credits." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const t = await response.text();
      console.error("AI gateway error:", response.status, t);
      throw new Error("AI gateway error");
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    let parsed;
    try {
      // Try to parse directly, or extract JSON from markdown code blocks
      const jsonStr = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      parsed = JSON.parse(jsonStr);
    } catch {
      parsed = {
        caption: content,
        detailed: content,
        tags: [],
        confidence: 0.7,
      };
    }

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("caption-image error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
