import { useEffect, useRef, useState, forwardRef, useImperativeHandle } from 'react'
import 'altcha'

/*
Very little changed here from exemplar here:
https://stackblitz.com/~/github.com/altcha-org/altcha-starter-react-ts?file=src/Altcha.tsx:L1-L51
...just removed "test" attribute (see below) and entered
url for GET handler in account/login/altcha to the challengeurl prop, in below
altcha-widget component

there needs to be a challenge generated, which is fetched via the server GET request. 
As the box is ticked, that's the logic that has occurred. Then the form data is transmitted
via the parent ExecuteSignIn component. In the altcha docs, that side was carried out
via an explicitly coded POST request. In this case the data is processed in the server component
that deals with the rest of the sign in process, validating email addresses and such
*/

// Importing altcha package will introduce a new element <altcha-widget>



interface AltchaProps {
  onStateChange?: (ev: Event | CustomEvent) => void
}

const Altcha = forwardRef<{ value: string | null }, AltchaProps>(({ onStateChange }, ref) => {
  const widgetRef = useRef<AltchaWidget & AltchaWidgetMethods & HTMLElement>(null)
  const [value, setValue] = useState<string | null>(null)  

  useImperativeHandle(ref, () => {
    return {
      get value() {
        return value
      }
    }
  }, [value])

  useEffect(() => {
    const handleStateChange = (ev: Event | CustomEvent) => {
      if ('detail' in ev) {
        setValue(ev.detail.payload || null)
        onStateChange?.(ev)
      }
    }

    const { current } = widgetRef

    if (current) {
      current.addEventListener('statechange', handleStateChange)
      return () => current.removeEventListener('statechange', handleStateChange)
    }
  }, [onStateChange])

  /* Configure your `challengeurl` and remove the `test` attribute, see docs: https://altcha.org/docs/v2/widget-integration/  
  NOTE: challengeurl receives the url that enacts the GET request via the route.ts file in /account/login/altcha/
  */
  return (
    <altcha-widget
      ref={widgetRef}
      style={{
        '--altcha-max-width': '100%',
      }}
      debug
      challengeurl={'/account/login/altcha'}
    ></altcha-widget>
  )
})

export default Altcha
