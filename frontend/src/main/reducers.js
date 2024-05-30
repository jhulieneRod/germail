import { combineReducers } from 'redux'
import { reducer as formReducer } from 'redux-form'
import { reducer as toastrReducer } from 'react-redux-toastr'

import DashboardReducer from '../dashboard/dashboardReducer';
// import ComboBox from '../combobox/comboBoxReducer';
import TabReducer from '../common/tab/tabReducer';
import AuthReducer from '../auth/authReducer';
import CadUsuario from '../usuario/usuarioReducer';
import CadConfiguracao from '../configuracao/configuracaoReducer';
import CadTag from '../tag/tagReducer';
import CadLead from '../lead/leadReducer';
import CadEmail from '../email/emailReducer';
import CadDestinatarioEmail from '../destinatarioEmail/destinatarioEmailReducer';

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
    // comboboxCad : ComboBox,
    tab: TabReducer,
    form: formReducer,
    toastr: toastrReducer,
    auth: AuthReducer,
    usuarioCad: CadUsuario,
    configuracaoCad: CadConfiguracao,
    tagCad: CadTag,
    emailCad: CadEmail,
    leadCad: CadLead,
    destinatarioEmailCad: CadDestinatarioEmail,
})

export default rootReducer