<%--
  Created by IntelliJ IDEA.
  structures.User: Вячеслав
  Date: 30.05.2016
  Time: 23:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <meta charset="UTF-8">
    <title>Login Form</title>


    <link rel='stylesheet prefetch'
          href='http://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/3.2.0/css/bootstrap.css'>
    <link rel='stylesheet prefetch'
          href='http://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.2.0/css/font-awesome.min.css'>
    <script src="js/alertRegistred.js"></script>
    <link rel="stylesheet" href="css/loginform.css">
</head>
<body onload="run()">
<main class="todos">
    <div class="login">
        <form class="login-form" action="#" method="get">
            <div class="input-group input-group-lg">
                <div class="input-group-addon"><span class="fa fa-lg fa-envelope"/></div>
                <input name="login" type="text" class="form-control" id="user-name" placeholder="Login" required
                       tabindex="1"/>
            </div>
            <div class="input-group input-group-lg">
                <div class="input-group-addon"><span class="fa fa-lg fa-key"/></div>
                <input name="pass" type="password" class="form-control" id="password" placeholder="Password" required
                       tabindex="2"/>
            </div>
            <input type="submit" id="login" formaction="/registred" class="btn btn-primary fa-lg" value="Sign up"
                   tabindex="3"/>
            <!-- <div class="login-bar">
              <input type="checkbox" id="stay-signed-in" tabindex="4"/><label for="stay-signed-in">Keep me signed in</label>
              <a href="#" class="pull-right">Forgotten your password?</a>
            </div>  -->
        </form>

        <!-- <div class="social">
          <div class="social-inner">
            <a class="fa fa-2x fa-google btn btn-danger"></a>
            <a class="fa fa-2x fa-twitter btn btn-info"></a>
            <a class="fa fa-2x fa-facebook btn btn-primary"></a>
          </div>
        </div> -->

        <div class="register">
            <div class="register-inner">
                <a href="loginform.jsp" class="btn btn-success">Sign in</a>
            </div>
        </div>
    </div>
</main>
</body>
</html>
