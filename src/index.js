import { library, dom } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons/faCoffee'
import { faBell } from '@fortawesome/free-regular-svg-icons/faBell'
import { faFontAwesome } from '@fortawesome/free-brands-svg-icons/faFontAwesome'
library.add(faCoffee, faBell, faFontAwesome)
dom.watch()
