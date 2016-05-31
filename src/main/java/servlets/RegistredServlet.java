package servlets;

import storage.users.InMemoryUserStorage;
import storage.users.UserStorage;
import structures.User;
import utils.Hashcode;

import javax.jws.soap.SOAPBinding;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.security.NoSuchAlgorithmException;

@WebServlet(value = "/registred")
public class RegistredServlet extends HttpServlet {
    private UserStorage userStorage = InMemoryUserStorage.getInstance();

    @Override
    protected void doGet(HttpServletRequest req, HttpServletResponse resp) throws ServletException, IOException {
        String login = req.getParameter("login");
        String password = null;
        try {
            password = Hashcode.encryptPassword(req.getParameter("pass"));
        } catch (NoSuchAlgorithmException e) {
            e.printStackTrace();
        }
        String name = login;

        User user = new User();
        user.setLogin(login);
        user.setPassword(password);
        user.setName(name);

        if (userStorage.ifLoginExist(user)) {
            resp.sendRedirect("/registredError.jsp");
        } else {
            userStorage.addUser(user);
            resp.sendRedirect("/loginform.jsp");
            //req.setAttribute("infMes", "Login or password is entered incorrectly! Try it again");
        }
    }
}