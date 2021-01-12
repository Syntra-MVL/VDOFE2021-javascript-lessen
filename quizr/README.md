# Quizr

## Structuur
De oefening zit in een aparte map met de naam `quizr`
Daarin zitten alle bestanden die je nodig hebt om de oefening te maken, dit een `index.html`, `style.css` en een `script.js` bestand.
Het script en style bestand zal al gelinkt zijn aan het html bestand.
Het html bestand moeten jullie niet meer wijzigen.

### Quizr
#### Doel:
Een simpele quiz spel met Juist/Fout vragen.

Bekijk de demo op http://phpstack-224488-1654021.cloudwaysapps.com/quizr/

- Er zijn steeds 10 vragen die elk nieuw spel in een willekeurige volgorde worden getoond.
- De antwoorden (of ze al dan niet correct zijn) worden bijgehouden in:   
`<div class="result tag is-dark is-large">Vraag 01</div>`  
dit element heeft drie mogelijke standen:
  - nog niet beantwoord, met de class: `is-dark`
  - correct beantwoord, met de class: `is-success`
  - fout beantwoord, met de class: `is-danger`
- Het aantal correcte antwoorden word bijgehouden in:  
`<span id="total-correct">1</span>`
- De vraag wordt getoond in:  
   ```
   <div id="question" data-index="5">
     Een vraag...
   </div>
   ```  
   De index van de houdige vraag wordt bijgehouden in `data-index="0"`
- Antwoorden doe je door te klikken op:  
   `<a id="answer-true" class="answer button is-success is-medium">True</a>`  
   of  
   `<a id="answer-false" class="answer button is-danger is-medium">False</a>`
- Wanneer alle vragen beantwoord zijn wordt in plaats van een vraag het resultaat getoond.  
 Als er dan op de `#answer-true` knop wordt geklikt begint het spel opnieuw.
  




   
      
