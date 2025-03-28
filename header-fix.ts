// Handle general bullet points in longDescription and properly format headers like "Key Features:"
{item.longDescription.split('\n\n')
  .filter(para => para.includes('•') && 
         !para.includes('Architectural Components:') && 
         !para.includes('Key Components:') &&
         !para.includes('Detailed Sections:'))
  .map((paragraph, index) => {
    // Check if there's a header section before bullets (with a colon)
    let headerPart = null;
    let contentPart = paragraph;
    
    // Check for headers like "Key Features:" in the text
    if (paragraph.includes(':')) {
      const colonIndex = paragraph.indexOf(':');
      // Check if the colon appears before any bullet points
      if (colonIndex < paragraph.indexOf('•')) {
        headerPart = paragraph.substring(0, colonIndex).trim();
        contentPart = paragraph.substring(colonIndex + 1).trim();
      }
    }
    
    // Extract all bullet points
    const bulletPoints = contentPart
      .split('•')
      .map(point => point.trim())
      .filter(point => point.length > 0);
    
    return (
      <div key={`bullet-section-${index}`} className="mt-4 mb-6">
        {headerPart && (
          <p className={`font-medium ${colors.text} mb-4`}>
            {headerPart}:
          </p>
        )}
        <div className="space-y-3">
          {bulletPoints.map((point, idx) => (
            <div key={idx} className="flex items-start gap-3">
              <div className={`flex-shrink-0 w-5 h-5 rounded-full ${colors.medium} flex items-center justify-center mt-0.5`}>
                <div className={`w-1.5 h-1.5 rounded-full ${colors.button}`}></div>
              </div>
              <span className="text-gray-700 flex-1">{point}</span>
            </div>
          ))}
        </div>
      </div>
    );
  })
}
