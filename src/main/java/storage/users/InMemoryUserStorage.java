package storage.users;

import com.google.gson.Gson;
import com.google.gson.reflect.TypeToken;
import structures.User;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

public class InMemoryUserStorage implements UserStorage {
    private static InMemoryUserStorage ourInstance = new InMemoryUserStorage();

    public static InMemoryUserStorage getInstance() {
        return ourInstance;
    }

    private InMemoryUserStorage() {
        try {
            readJSON(new File(DEFAULT_PERSISTENCE_FILE_USERS));
        } catch (IOException e) {
            //logger.error("Error while opening file:", e);
        }
    }

    private static final String DEFAULT_PERSISTENCE_FILE_USERS = "C:\\webchatapp\\src\\main\\resources\\users.json";

    //private static final Logger logger = Log.create(InMemoryUserStorageStorage.class);

    private List<User> users = new ArrayList<>();

    @Override
    public void addUser(User user) {
        users.add(user);
        try {
            writeJSON(new File(DEFAULT_PERSISTENCE_FILE_USERS));
        } catch (FileNotFoundException e) {
            //logger.error("Eror while opening file: ", e);
        }
    }

    @Override
    public boolean updateUser(User user) {
        return false;
    }

    public void readJSON(File file) throws IOException {
        Gson gson = new Gson();
        BufferedReader br = new BufferedReader(new FileReader(file));
        if (file.length() > 4) {
            users = gson.fromJson(br, new TypeToken<ArrayList<User>>() {
            }.getType());
            //logger.info("File has been successfully read");
            //System.out.println(messages.toString());
        } else {
            System.out.println("JSON-file is empty");
            //logger.append("JSON-file is empty");
        }
        br.close();
    }

    public void writeJSON(File file) throws FileNotFoundException {
        Gson gson = new Gson();
        PrintStream psf = new PrintStream(file);
        psf.append(gson.toJson(users));
        //logger.append("Information was recorded\n");
    }

    @Override
    public int size() {
        return users.size();
    }

    @Override
    public boolean ifUserExist(User user) {
        for (User it : users) {
            if (it.getLogin().equals(user.getLogin()) && it.getPassword().equals(user.getPassword())) {
                return true;
            }
        }
        return false;
    }

    @Override
    public boolean ifLoginExist(User user) {
        for (User it : users) {
            if (it.getLogin().equals(user.getLogin())) {
                return true;
            }
        }
        return false;
    }
}
