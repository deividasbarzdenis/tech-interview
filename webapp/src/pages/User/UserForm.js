import Container from "@material-ui/core/Container";
import {CssBaseline, Grid, makeStyles, TextField, Typography} from "@material-ui/core";
import * as yup from "yup";
import {Form, Formik} from "formik"
import Button from "@material-ui/core/Button";
import {useHistory} from "react-router-dom";
import {saveUser} from "../../api/userApi";
import {isDate, parse} from "date-fns";

const useStyles = makeStyles((theme) => ({
    text: {},
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    wrapper: {
        marginBottom: '20px',
    },
    form: {
        width: '100%',
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(2, 2, 0),
    },
}));

const parseDateString = (value, originalValue) => {
    return isDate(originalValue)
        ? originalValue
        : parse(originalValue, "yyyy-MM-dd", new Date());
}
const today = new Date();

const validationSchema = yup.object().shape({
    name: yup.string().min(3, 'Name must have at least 3 letters').required('Name is required'),
    surname: yup.string().min(3, 'Surname must have at least 3 letters').required('Surname is required'),
    birthDate: yup.date().transform(parseDateString).max(today).required('Birth date is required'),
    email: yup.string().email('Must be a valid email').max(255).required('Email is required'),
    password: yup.string().required("Please enter your password").matches(
        /^.*(?=.{8,})((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-z]){1})((?=.*[A-Z]){1}).*$/,
        "Password must contain at least 8 characters, one uppercase, one number and one special case character"),
    confirmPassword: yup.string().required("Please confirm your password")
        .when("password", {
            is: password => (password && password.length > 0),
            then: yup.string().oneOf([yup.ref("password")], "Password doesn't match")
        }),
    phone: yup.string()
        .matches(/(86|\+3706)\d{3}\d{4}/, {
            message: "Invalid phone number",
            excludeEmptyString: false,
        })
        .required(),
    identity: yup.string()
        .matches(/^\d{3}-\d{2}-\d{4}$/, {
            message: "Invalid identity number",
            excludeEmptyString: false,
        })
        .required(),
    passportNumber: yup.string()
        .matches(/^\d{3}\+\d{4}$/, {
            message: "Invalid passport number",
            excludeEmptyString: false,
        })
        .required(),
});

const UserForm = () => {
    const classes = useStyles();
    const history = useHistory();

    const submitForm = (formValues, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        saveUser(formValues)
            .then(() => {
                history.push("/");
            })
            .finally(() => {
                formikHelpers.setSubmitting(false);
            })
    };
    return (
        <Formik
            initialValues={{
                name: '',
                surname: '',
                birthDate: '',
                email: '',
                password: '',
                confirmPassword: '',
                phone: '',
                identity: '',
                passportNumber: ''
            }}
            onSubmit={submitForm}
            validationSchema={validationSchema}
        >
            {(props) => {
                const {
                    values,
                    touched,
                    errors,
                    handleBlur,
                    handleChange,
                    isSubmitting,
                } = props
                return (
                    <>
                        {/*<PropsState {...props}/>*/}
                        <Container component="main" maxWidth="xs" className={classes.wrapper}>
                            <CssBaseline/>
                            <div className={classes.paper}>
                                <Typography component="h1" variant="h5">
                                    Create a user
                                </Typography>
                            </div>
                            <Form className={classes.form}>
                                <Grid container
                                      spacing={2}
                                      alignItems="center"
                                      justifyContent="center">
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='name'
                                            label='Name'
                                            type="text"
                                            value={values.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.name ? errors.name : ""}
                                            error={touched.name && Boolean(errors.name)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='surname'
                                            label='Surname'
                                            type="text"
                                            value={values.surname}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.surname ? errors.surname : ""}
                                            error={touched.surname && Boolean(errors.surname)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='password'
                                            label='Password'
                                            type="password"
                                            value={values.password}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.password ? errors.password : ""}
                                            error={touched.password && Boolean(errors.password)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='confirmPassword'
                                            label='Confirm Password'
                                            type="password"
                                            value={values.confirmPassword}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.confirmPassword ? errors.confirmPassword : ""}
                                            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <TextField
                                            className={classes.text}
                                            id='email'
                                            label='Email'
                                            type="text"
                                            value={values.email}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.email ? errors.email : ""}
                                            error={touched.email && Boolean(errors.email)}
                                            fullWidth
                                            autoFocus
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='birthDate'
                                            label='Birth Date'
                                            type="text"
                                            value={values.birthDate}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.birthDate ? errors.birthDate : ""}
                                            error={touched.birthDate && Boolean(errors.birthDate)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='phone'
                                            label='Phone'
                                            type="text"
                                            value={values.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.phone ? errors.phone : ""}
                                            error={touched.phone && Boolean(errors.phone)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='identity'
                                            label='identity'
                                            type="text"
                                            value={values.identity}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.identity ? errors.identity : ""}
                                            error={touched.identity && Boolean(errors.identity)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <TextField
                                            className={classes.text}
                                            id='passportNumber'
                                            label='passportNumber'
                                            type="text"
                                            value={values.passportNumber}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            helperText={touched.passportNumber ? errors.passportNumber : ""}
                                            error={touched.passportNumber && Boolean(errors.passportNumber)}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12}>
                                        <Button
                                            type="submit"
                                            color="primary"
                                            variant="contained"
                                            disabled={isSubmitting}
                                            fullWidth
                                        >
                                            SUBMIT
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Form>
                        </Container>
                    </>
                )
            }}
        </Formik>
    );
}

export default UserForm;
