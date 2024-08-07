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
import CadLogDestinatarioEmail from '../logDestinatarioEmail/logDestinatarioEmailReducer';
import CadSequencia from '../sequencia/sequenciaReducer';

const rootReducer = combineReducers({
    dashboard: DashboardReducer,
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
    logDestinatarioEmailCad: CadLogDestinatarioEmail,
    sequenciaCad: CadSequencia,
})

export default rootReducer