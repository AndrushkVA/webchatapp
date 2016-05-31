package storage.users;

import structures.User;

public interface UserStorage {
    void addUser(User user);

    boolean updateUser(User user);

    int size();

    boolean ifUserExist(User user);

    boolean ifLoginExist(User user);
}
