import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { required } from '../common/form/inputConfig';
import { init, create, update } from './leadActions';
import LabelAndInput from '../common/form/labelAndInput';
import Button from '../common/form/button';
import { msgWarning } from '../common/msg/msg';
import { CardBodyScroll, CardFooter } from '../common/layout/card';
import ButtonTextSearchGrid from '../common/grid/buttonTextSearchGrid';
import TagListSearch from '../tag/tagListSearch';

let LeadForm = (props) => {
    const semTag = [{cor: '#333', titulo: 'Nenhuma Tag Selecionada'}];
    const [show, setShow] = useState(false);
    const [tag, setTag] = useState(semTag);

    useEffect(() => {
        if(props.formValue?.tags){
            let tags = props.formValue.tags.split(',');
            let newTags = [];
            tags.map((tag) => {
                let tagLead = tag.split(':::');
                newTags.push({id: tagLead[2], 
                    titulo: tagLead[0], 
                    cor: tagLead[1]});
            });
            setTag(newTags);
        }
    }, [props.formValue]);

    const adicionaTag = (newTag) =>{
        let newTags = [...tag];
        newTags.push(newTag);
        setTag(newTags);
        setShow(false);
    }

    function salvarLead() {
        debugger;
        if (!props.valid) {
            msgWarning('Informe os campos obrigatórios');
            props.handleSubmit();
        } else {
            delete props.formValue.status_descricao;
            props.formValue.tags = tag;

            if (props.readOnly) {
                props.update(props.formValue);
            } else {
                props.create(props.formValue);
            }
        }
    }

    return (
        <form name={props.name}>
            <CardBodyScroll>
                <Field
                    name='id'
                    component={LabelAndInput}
                    readOnly={true}
                    label='Código'
                    cols='12'
                    placeholder='Automático'
                    wCol="135"
                />

                <Field
                    name='nome'
                    maxLength={100}
                    component={LabelAndInput}
                    label='Nome'
                    cols='12'
                    placeholder='Informe o nome'
                    validate={required}
                />

                <Field
                    name='email'
                    maxLength={200}
                    component={LabelAndInput}
                    label='E-mail'
                    cols='12'
                    placeholder='Informe o e-mail'
                    validate={required}
                />

                <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    marginLeft: '10px',
                    marginTop: '10px',
                }}>
                    {tag.map((tag, index) => {
                            return (
                                <div 
                                    key={index}
                                    style={{
                                        backgroundColor: tag.cor, 
                                        padding: '3px', 
                                        borderRadius: '100px 0 100px 0',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: '#FFF',
                                        fontWeight: '600',
                                        minWidth: '120px',
                                        fontSize:'small',
                                        height:'20px'
                                    }}>
                                    {tag.titulo}
                                </div>
                            );
                        })}
                    <Field
                        name='select_tag'
                        maxLength={200}
                        component={ButtonTextSearchGrid}
                        label='Selecionar Tag'
                        cols='12'
                        onBtnClick={() => setShow(true)}
                    />
                    {(tag.id !== 0)
                      &&  <Field
                            name='remove_tag'
                            maxLength={200}
                            component={ButtonTextSearchGrid}
                            label='Limpar'
                            icon='trash'
                            cols='12'
                            onBtnClick={() => setTag(semTag)}
                            className='link'
                        />
                    }  
                </div>

                <TagListSearch
                    title={'Tags'}
                    show={show}
                    onHide={() => setShow(false)}
                    onSelect={adicionaTag}
                />

            </CardBodyScroll>
            <CardFooter>
                <Button type='button' className={props.submitClass} icon='check' label={props.submitLabel} onClick={salvarLead} />
                <Button type='button' className='secondary' icon='times' label='Cancelar' onClick={() => { props.init() }} />
            </CardFooter>
        </form>
    )
}

LeadForm = reduxForm({ form: 'leadForm', destroyOnUnmount: false, })(LeadForm);

const mapStateToProps = state => ({
    formValue: getFormValues('leadForm')(state)
});

const mapDispatchToProps = dispatch => bindActionCreators({ init, create, update }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(LeadForm);