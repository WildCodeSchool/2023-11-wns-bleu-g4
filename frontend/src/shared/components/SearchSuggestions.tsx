interface SearchSuggestionsProps {
    suggestions: any[]; 
  }
  
  export default function SearchSuggestions({ suggestions }: SearchSuggestionsProps) {
    return (
      <div>
        {suggestions.map(product => (
          <div key={product.id}>{product.name}</div>
        ))}
      </div>
    );
  }