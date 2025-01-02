titles = [
"12. Cinematic_Moody - The Art of Atmosphere",
"13. Cinematic_Neutral - Quiet Elegance",
"14. Cinematic_Retro - Vintage Revival",
"15. Cinematic_Portrait - Faces and Expressions",
"16. Cinematic_Stock Photo - Versatile Visuals",
"17. Cinematic_Unprocessed - Pure and Raw",
"18. Cinematic_Vibrant - The Power of Color",
"19. Anime_Background - Building Anime Worlds",
"20. Anime_Flat Illustration - Flat Yet Impactful",
"21. Anime_Monochrome - Minimalistic Anime Vibes",
"22. Anime_Retro - Anime Nostalgia",
"23. Anime_Screencap - Framing Anime Moments",
"24. Anime_Semi-Realism - Anime Meets Realism",
"25. Anime_Character Sheet - Blueprint of Personalities",
"26. Anime_Character Sheet Painterly - Brushed Stories",
"27. Anime_Manga - Panel Perfection",
"28. PortraitPerfect_Bokeh - Focus on Faces",
"29. PortraitPerfect_Cinematic - Dramatic Portraiture",
"30. PortraitPerfect_Close-Up - Revealing Depth",
"31. PortraitPerfect_Fashion - Styled to Perfection",
"32. PortraitPerfect_Film - Portraits in Motion",
"33. PortraitPerfect_Moody - Emotive Captures",
"34. PortraitPerfect_Retro - Vintage Portraits",
"35. DSLRPhotography_Stock Photo - Picture Perfect Stock",
"36. GraphicDesign_2D Design - Flat Creativity",
"37. GraphicDesign_3D Design - Adding Dimensions",
"38. GraphicDesign_Art Deco Design - Golden Age Revival",
"39. GraphicDesign_Pop Art Design - Bold and Bright",
"40. GraphicDesign_Vector Design - Precision Meets Creativity",
"41. HyperRealism_3D Render - Depth in Details",
"42. HyperRealism_Bokeh - Layered Realism",
"43. HyperRealism_Cinematic - Real-Life Drama",
"44. HyperRealism_Close-Up - Detailed Intimacy",
"45. HyperRealism_Creative - Reimagining Reality",
"46. HyperRealism_Fashion - Haute Realism",
"47. HyperRealism_Film - Hyper-Real Frames",
"48. HyperRealism_HDR - Bright and Bold Realism",
"49. HyperRealism_Illustration - Life-Like Strokes",
"50. HyperRealism_Long Exposure - Stretched Realities",
"51. HyperRealism_Macro - Hyper-Real Microcosms",
"52. HyperRealism_Minimalist - Focused Simplicity",
"53. HyperRealism_Monochrome - Realism in Black and White",
"54. HyperRealism_Moody - Darkly Detailed",
"55. HyperRealism_Ray Traced - Perfect Light, Perfect Shadows",
"56. HyperRealism_Retro - Hyper-Real Nostalgia",
"57. HyperRealism_Vibrant - Colorful Realities"
]

import os

output_dir = "Home"
os.makedirs(output_dir, exist_ok=True)
for title in titles:
    filename = f"{title}.txt"
    file_path = os.path.join(output_dir, filename)
    with open(file_path, "w") as file:
        file.write(title)
print(f"Generated {len(titles)} .txt files in the '{output_dir}' directory.")