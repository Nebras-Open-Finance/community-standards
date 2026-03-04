import './index.css'
import DefaultTheme from 'vitepress/theme'
import Layout from './Layout.vue'

// Pages
import HomePage from '../../components/WebPages/HomePage.vue'
import NewsPage from '../../components/WebPages/NewsPage.vue'
import MetricsPage from '../../components/WebPages/MetricsPage.vue'
import KnowledgeBasePage from '../../components/WebPages/KnowledgeBasePage.vue'

//components
import ImageViewer from '../../components/ImageViewer.vue'
import APIFlowViewer from '../../components/APIFlowViewer.vue'
import AccountEditor from '../../components/AccountEditor.vue'
import RedocWrapper from '../../components/RedocWrapper.vue'
import Carousel from '../../components/Carousel.vue'
import ProtectedPageWrapper from '../../components/ProtectedPageWrapper.vue'
import LiveAPIs from '../../components/LiveAPIs.vue'
import EditableJson from '../../components/EditableJson.vue'

// API Flows
import APIFlowsRegistration from '../../components/APIFlows/TPPRegistration.vue'
import APIFlowsBankDataSharing from '../../components/APIFlows/BankDataSharing.vue'
import APIFlowsSingleInstantPayment from '../../components/APIFlows/SingleInstantPayment.vue'
import APIFlowsVariableOnDemand from '../../components/APIFlows/VariableOnDemand.vue'
import APIFlowsFixedOnDemand from '../../components/APIFlows/FixedOnDemand.vue'
import APIFlowsConsentFlow from '../../components/APIFlows/ConsentFlow.vue'
import APIFlowsConfirmationOfPayee from '../../components/APIFlows/ConfirmationOfPayee.vue'

// UIs
import ConsentBankDataSharing from '../../components/ConsentPages/ConsentBankDataSharing.vue'
import ConsentSingleInstantPayment from '../../components/ConsentPages/ConsentSingleInstantPayment.vue'
import ConsentVariableOnDemand from '../../components/ConsentPages/ConsentVariableOnDemand.vue'
import ConsentFixedOnDemand from '../../components/ConsentPages/ConsentFixedOnDemand.vue'

import AuthorizationBankDataSharing from '../../components/AuthorizationPages/AuthorizationBankDataSharing.vue'
import AuthorizationSingleInstantPayment from '../../components/AuthorizationPages/AuthorizationSingleInstantPayment.vue'
import AuthorizationVariableOnDemand from '../../components/AuthorizationPages/AuthorizationVariableOnDemand.vue'
import AuthorizationFixedOnDemand from '../../components/AuthorizationPages/AuthorizationFixedOnDemand.vue'


import PermissionsReference from '../../components/PermissionsReference.vue'
import ServiceInitiationPermissionText from '../../components/ServiceInitiationPermissionText.vue'
import PaymentConsentPermissionsText from '../../components/ConsentPages/PaymentConsentPermissionsText.vue'


export default {
  extends: DefaultTheme,
  Layout,
  enhanceApp({ app }) {
    //pages
    app.component('HomePage', HomePage)
    app.component('NewsPage', NewsPage)
    app.component('MetricsPage', MetricsPage)
    app.component('KnowledgeBasePage', KnowledgeBasePage)

    //components
    app.component('ImageViewer', ImageViewer)
    app.component('APIFlowViewer', APIFlowViewer)
    app.component('AccountEditor', AccountEditor)
    app.component('RedocWrapper', RedocWrapper)
    app.component('Carousel', Carousel)
    app.component('ProtectedPageWrapper', ProtectedPageWrapper)
    app.component('LiveAPIs', LiveAPIs)
    app.component('EditableJson', EditableJson)

    // API Flows
    app.component('APIFlowsRegistration', APIFlowsRegistration)
    app.component('APIFlowsBankDataSharing', APIFlowsBankDataSharing)
    app.component('APIFlowsSingleInstantPayment', APIFlowsSingleInstantPayment)
    app.component('APIFlowsVariableOnDemand', APIFlowsVariableOnDemand)
    app.component('APIFlowsFixedOnDemand', APIFlowsFixedOnDemand)
    app.component('APIFlowsConsentFlow', APIFlowsConsentFlow)
    app.component('APIFlowsConfirmationOfPayee', APIFlowsConfirmationOfPayee)

    // UI
    app.component('ConsentBankDataSharing', ConsentBankDataSharing)
    app.component('ConsentSingleInstantPayment', ConsentSingleInstantPayment)
    app.component('ConsentVariableOnDemand', ConsentVariableOnDemand)
    app.component('ConsentFixedOnDemand', ConsentFixedOnDemand)

    app.component('AuthorizationBankDataSharing', AuthorizationBankDataSharing)
    app.component('AuthorizationSingleInstantPayment', AuthorizationSingleInstantPayment)
    app.component('AuthorizationVariableOnDemand', AuthorizationVariableOnDemand)
    app.component('AuthorizationFixedOnDemand', AuthorizationFixedOnDemand)

    app.component('PermissionsReference', PermissionsReference)
    app.component('ServiceInitiationPermissionText', ServiceInitiationPermissionText)
    app.component('PaymentConsentPermissionsText', PaymentConsentPermissionsText)

  }
}



