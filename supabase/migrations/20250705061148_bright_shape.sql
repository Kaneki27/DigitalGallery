/*
  # Rejoice Event Gallery Database Schema
  
  This database schema supports the Digital Office Event Gallery Platform "Rejoice"
  with secure authentication, event management, media storage, and user interactions.
  
  ## Tables Overview
  
  1. **users** - User authentication and profile information
  2. **events** - Event details and categorization
  3. **media** - Media files with metadata and approval status
  4. **comments** - User comments on media items
  5. **likes** - User likes on media items
  6. **user_roles** - Role-based access control
  7. **event_participants** - Many-to-many relationship between users and events
  
  ## Security Features
  
  - Role-based access control (admin/employee)
  - Content approval workflow
  - Secure file storage links
  - User activity tracking
*/

-- Create database
CREATE DATABASE IF NOT EXISTS rejoice_gallery;
USE rejoice_gallery;

-- Users table for authentication and profiles
CREATE TABLE IF NOT EXISTS users (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  role ENUM('admin', 'employee') DEFAULT 'employee',
  department VARCHAR(100),
  avatar_url VARCHAR(500),
  total_uploads INT DEFAULT 0,
  total_likes INT DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX idx_email (email),
  INDEX idx_role (role),
  INDEX idx_department (department)
);

-- Events table for organizing media
CREATE TABLE IF NOT EXISTS events (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  event_date DATE NOT NULL,
  category VARCHAR(100) NOT NULL,
  department VARCHAR(100),
  cover_image_url VARCHAR(500),
  media_count INT DEFAULT 0,
  created_by VARCHAR(36) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_event_date (event_date),
  INDEX idx_category (category),
  INDEX idx_department (department),
  INDEX idx_created_by (created_by)
);

-- Media table for storing photos and videos
CREATE TABLE IF NOT EXISTS media (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  event_id VARCHAR(36) NOT NULL,
  file_url VARCHAR(500) NOT NULL,
  file_type ENUM('image', 'video') NOT NULL,
  file_size INT,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  tags JSON,
  uploaded_by VARCHAR(36) NOT NULL,
  approved BOOLEAN DEFAULT FALSE,
  approved_by VARCHAR(36),
  approved_at TIMESTAMP NULL,
  likes_count INT DEFAULT 0,
  comments_count INT DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (uploaded_by) REFERENCES users(id) ON DELETE CASCADE,
  FOREIGN KEY (approved_by) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_event_id (event_id),
  INDEX idx_uploaded_by (uploaded_by),
  INDEX idx_approved (approved),
  INDEX idx_file_type (file_type),
  INDEX idx_created_at (created_at)
);

-- Comments table for user interactions
CREATE TABLE IF NOT EXISTS comments (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  media_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  content TEXT NOT NULL,
  is_approved BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX idx_media_id (media_id),
  INDEX idx_user_id (user_id),
  INDEX idx_created_at (created_at)
);

-- Likes table for user interactions
CREATE TABLE IF NOT EXISTS likes (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  media_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (media_id) REFERENCES media(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_like (media_id, user_id),
  INDEX idx_media_id (media_id),
  INDEX idx_user_id (user_id)
);

-- Event participants table (many-to-many relationship)
CREATE TABLE IF NOT EXISTS event_participants (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  event_id VARCHAR(36) NOT NULL,
  user_id VARCHAR(36) NOT NULL,
  joined_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (event_id) REFERENCES events(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  UNIQUE KEY unique_participant (event_id, user_id),
  INDEX idx_event_id (event_id),
  INDEX idx_user_id (user_id)
);

-- Activity log table for audit trail
CREATE TABLE IF NOT EXISTS activity_log (
  id VARCHAR(36) PRIMARY KEY DEFAULT (UUID()),
  user_id VARCHAR(36),
  action VARCHAR(100) NOT NULL,
  resource_type VARCHAR(50) NOT NULL,
  resource_id VARCHAR(36),
  details JSON,
  ip_address VARCHAR(45),
  user_agent TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL,
  INDEX idx_user_id (user_id),
  INDEX idx_action (action),
  INDEX idx_resource_type (resource_type),
  INDEX idx_created_at (created_at)
);

-- Triggers to update counters
DELIMITER $$

CREATE TRIGGER update_media_count_on_insert
AFTER INSERT ON media
FOR EACH ROW
BEGIN
  UPDATE events SET media_count = media_count + 1 WHERE id = NEW.event_id;
  UPDATE users SET total_uploads = total_uploads + 1 WHERE id = NEW.uploaded_by;
END$$

CREATE TRIGGER update_media_count_on_delete
AFTER DELETE ON media
FOR EACH ROW
BEGIN
  UPDATE events SET media_count = media_count - 1 WHERE id = OLD.event_id;
  UPDATE users SET total_uploads = total_uploads - 1 WHERE id = OLD.uploaded_by;
END$$

CREATE TRIGGER update_likes_count_on_insert
AFTER INSERT ON likes
FOR EACH ROW
BEGIN
  UPDATE media SET likes_count = likes_count + 1 WHERE id = NEW.media_id;
  UPDATE users SET total_likes = total_likes + 1 WHERE id = (SELECT uploaded_by FROM media WHERE id = NEW.media_id);
END$$

CREATE TRIGGER update_likes_count_on_delete
AFTER DELETE ON likes
FOR EACH ROW
BEGIN
  UPDATE media SET likes_count = likes_count - 1 WHERE id = OLD.media_id;
  UPDATE users SET total_likes = total_likes - 1 WHERE id = (SELECT uploaded_by FROM media WHERE id = OLD.media_id);
END$$

CREATE TRIGGER update_comments_count_on_insert
AFTER INSERT ON comments
FOR EACH ROW
BEGIN
  UPDATE media SET comments_count = comments_count + 1 WHERE id = NEW.media_id;
END$$

CREATE TRIGGER update_comments_count_on_delete
AFTER DELETE ON comments
FOR EACH ROW
BEGIN
  UPDATE media SET comments_count = comments_count - 1 WHERE id = OLD.media_id;
END$$

DELIMITER ;

-- Insert sample data
INSERT INTO users (email, password_hash, name, role, department, total_uploads, total_likes) VALUES
('admin@company.com', '$2b$10$sample_hash_admin', 'Admin User', 'admin', 'IT', 0, 0),
('employee@company.com', '$2b$10$sample_hash_employee', 'John Doe', 'employee', 'Engineering', 42, 128),
('sarah@company.com', '$2b$10$sample_hash_sarah', 'Sarah Wilson', 'employee', 'Marketing', 28, 89),
('mike@company.com', '$2b$10$sample_hash_mike', 'Mike Johnson', 'employee', 'Sales', 15, 45);

INSERT INTO events (name, description, event_date, category, department, created_by) VALUES
('Annual Company Day 2024', 'Annual celebration with all employees', '2024-12-15', 'Company Event', 'HR', (SELECT id FROM users WHERE email = 'admin@company.com')),
('Team Building Adventure', 'Outdoor team building activities', '2024-12-10', 'Team Building', 'HR', (SELECT id FROM users WHERE email = 'admin@company.com')),
('Holiday Celebration', 'End of year holiday party', '2024-12-20', 'Holiday', 'HR', (SELECT id FROM users WHERE email = 'admin@company.com'));

-- Create indexes for better performance
CREATE INDEX idx_media_approved_created ON media(approved, created_at);
CREATE INDEX idx_events_active_date ON events(is_active, event_date);
CREATE INDEX idx_users_active_role ON users(is_active, role);